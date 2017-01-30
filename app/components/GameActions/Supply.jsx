var React = require('react');
var {connect} = require('react-redux');
var {Column, Button} = require('react-foundation');
var {convertHrtoDays, CreateSupplyProgress} = require('helpers');
var {hideMenu, showMenu, setCurrentIndex, setSupplyProgress} = require('Actions');
var Supply = React.createClass({

    getInitialState: function () {
        return {
            type: null,
            selected: null,
            largeSize: 12
        };
    },

    generateButtonClass: function () {
        if(this.props.APIprogress)
            return "button success expanded disabled no-margin-bottom";
        else
            return "button success expanded no-margin-bottom"
    },

    getAllocated: function (supply, space_id) {
        var allocated = 0; 
        for(var i in supply) {
            if (supply[i].source_space_id == space_id)
                allocated += supply[i].quantity;
        }
        return allocated;
    },

    getAllocatedSupply: function (supply, space_id) {
        var allocated = 0; 
        for(var i in supply) {
            if (supply[i].destination_space_id == space_id)
                allocated += supply[i].quantity;
        }
        return allocated;
    },

    getNetSupply: function (supply, space_id) {
        var allocated = 0; 
        for(var i in supply) {
            if (supply[i].destination_space_id == space_id)
                allocated += supply[i].quantity;
            else if (supply[i].source_space_id == space_id)
                allocated -= supply[i].quantity;
        }
        return allocated;
    },

    handleSubmit: function (e) {
        e.preventDefault();

        var submit = this.refs.submit;
        var qty = this.refs.qty;

        this.refs.err_msg.innerHTML = "";

        var supply = Math.floor(qty.value);
    
        // Check for invalid input    
        if(supply === NaN) {
            this.refs.err_msg.innerHTML = "*Enter a valid Number";
            return false;
        } 

        if(supply <= 0) {
            this.refs.err_msg.innerHTML = "Minimum Supply qty is 1";
            return false;
        }

        var {index, LayoutSpaces, warehouses, supplyProgress} = this.props;
        var {selected} = this.state;

        var space_id = LayoutSpaces[index].space_id;
        var warehouse = warehouses[space_id];
        var stock = warehouse.stock - this.getAllocated(supplyProgress, space_id);

        // check for capacity constraints
        if(supply > stock) {
            this.refs.err_msg.innerHTML = `Supply cannot excede Available stock of ${stock}`;
            return false;
        }

        // check for demand constraints
        if(this.state.type === 'retailer') {
            var totalRequired = function (demand) {
                var result = 0;
                for(var i in demand) {
                    result += demand[i].demand_qty - demand[i].supplied_qty;
                }
                return result;
            };

            var {demands} = this.props;
            var required = totalRequired(demands[selected]) - this.getAllocatedSupply(supplyProgress, selected);
            if (supply > required) {
                this.refs.err_msg.innerHTML = `Supply cannot excede demand qty of ${required}`;
                return false;
            }
        }

        //TODO: Check for money Constraints

        //Everything OK. Append to Supply Progress.
        qty.value = '';
        var {dispatch} = this.props;
        var supply_object = {
            'source_space_id': space_id,
            'destination_space_id': selected,
            'quantity': supply,
            'is_super': 0
        };

        dispatch(setSupplyProgress(CreateSupplyProgress(supplyProgress, supply_object)));
        return false;
    },

    generateRetailerContent: function () {
        var {demands, supplyProgress} = this.props;
        var {selected} = this.state;

        var generateRetailerElement = (demand, index) => {
            var {day, hr} = convertHrtoDays(demand.end_hr);
            var allocated = this.getAllocatedSupply(supplyProgress, selected);

            return (
                <div key={index}>
                    <p>Demand Qty: {demand.demand_qty}</p>
                    <p>Supplied Qty: {demand.supplied_qty}</p>
                    <p>Allocated Supply: {allocated}</p>
                    <p>Demand Expiry: Day {day}, Hr {hr}</p>
                    <form className="no-margin-top" onSubmit={this.handleSubmit}>
                        <Column small={12} medium={8} className="stacked-horizontally">
                            <input type="number" ref="qty" placeholder="Enter Qty" className="no-margin-bottom" required/>
                        </Column>
                        <Column small={12} medium={4} className="stacked-horizontally">
                            <input type="submit" className="button expanded no-margin-bottom secondary" ref="submit" value="Add"/>
                        </Column>
                        <p className="login__err-msg menu-messages" ref="err_msg"></p>
                    </form>
                </div>
            );
        }

        return demands[selected].map(generateRetailerElement);

    },

    generateWarehouseConentent: function () {
        var {warehouses, supplyProgress} = this.props;
        var {selected} = this.state;
        var allocated = this.getNetSupply(supplyProgress, selected);
        var stock = warehouses[selected].stock;
        return (
            <div>
                <p>Existing Stock: {stock}</p>
                <p>Allocated Supply: {allocated}</p>
                <form className="no-margin-top" onSubmit={this.handleSubmit}>
                    <Column small={12} medium={8} className="stacked-horizontally">
                        <input type="number" ref="qty" placeholder="Enter Qty" className="no-margin-bottom" required/>
                    </Column>
                    <Column small={12} medium={4} className="stacked-horizontally">
                        <input type="submit" className="button expanded no-margin-bottom secondary" ref="submit" value="Add"/>
                    </Column>
                    <p className="login__err-msg menu-messages" ref="err_msg"></p>
                </form>
            </div>
        );
    },

    generateContent: function () {
        var {selected, type} = this.state;

        if (type === null)
            return false;

        if (selected === null) {
            return <center>Select a {this.state.type} to view Details</center>;
        }

        if (type === 'retailer') {
            return this.generateRetailerContent();
        } else {
            return this.generateWarehouseConentent();
        }
    },

    handleElementChange: function () {
        var element = this.refs.elementList.value;
        this.setState({
            selected: element
        });
    },

    generateElementDropDown: function () {
        var {type} = this.state;

        if(type === null)
            return <center>Select a Type to view different options</center>;

        if(type === 'retailer') {
            var {demands, names} = this.props;

            var generateRetailerList = function(space_id) {
                var name = names[space_id];
                return (
                    <option value={space_id} key={space_id}>
                        {'Retailer ' + name}
                    </option>
                );
            };

            var list = [];
            for(var k in demands) {
                list.push(generateRetailerList(k));
            }

            return (
                <div className="minified-select">
                    <select onChange={this.handleElementChange} ref="elementList">
                        <option value="" disabled selected>Select a Retailer</option>
                        {list}
                    </select>
                </div>
            );
        } else {
            var {warehouses, names, index, LayoutSpaces} = this.props;
            var space_id = LayoutSpaces[index].space_id;

            var generateRetailerList = function(space_id) {
                var name = names[space_id];
                return (
                    <option value={space_id} key={space_id}>
                        {'Warehouse ' + name}
                    </option>
                );
            };

            var list = [];
            for(var k in warehouses) {
                if (k == space_id)
                    continue;
                list.push(generateRetailerList(k));
            }

            return (
                <div className="minified-select">
                    <select onChange={this.handleElementChange} ref="elementList">
                        <option value="" disabled selected>Select a Warehouse</option>
                        {list}
                    </select>
                </div>
            );
        }   
    },

    handleTypeChange: function () {
        var type = this.refs.typeList.value;
        this.setState({
            type,
            selected: null,
            largeSize: 6
        });
    },

    generateTypeDropDown: function () {
        return (
            <div>
                <Column small={12} medium={this.state.largeSize} className="stacked-horizontally minified-select">
                    <select onChange={this.handleTypeChange} ref="typeList">
                        <option value="" disabled selected>Select a Type</option>
                        <option value="retailer">Retailer</option>
                        <option value="warehouse">Warehouse</option>
                    </select>
                </Column>
                <Column small={12} medium={this.state.largeSize} className="stacked-horizontally">
                    {this.generateElementDropDown()}
                </Column>
                {this.generateContent()}
            </div>
        );
    },

    finalizeSupply: function () {
        var {dispatch} = this.props;
        dispatch(setCurrentIndex('finalizeSupply'));
    },

    generateFinalizeButton: function () {
        return (
            <Column>
                <Button type="button" className={this.generateButtonClass()} isExpanded onClick={this.finalizeSupply}>Finalize Supplies</Button>
            </Column>
        );
    },

    render: function () {
        var {index, warehouses, LayoutSpaces, supplyProgress} = this.props;
        var space_id = LayoutSpaces[index].space_id;
        var warehouse = warehouses[space_id];
        var allocated = this.getAllocated(supplyProgress, space_id);
        return (
            <div className="minified">
                <p>Stock : {warehouse.stock}</p>
                <p>Allocated for Supply : {allocated}</p>
                <p>Remaining : {warehouse.stock - allocated}</p>
                {this.generateTypeDropDown()}
                {this.generateFinalizeButton()}
            </div>
        );
    }

});

module.exports = connect(
    (state) => {
        return {
            index: state.layoutDetails.CurrentIndex,
            LayoutSpaces: state.layoutDetails.LayoutSpaces,
            warehouses: state.warehouses,
            names: state.names,
            demands: state.demands,
            warehouses: state.warehouses,
            supplyProgress: state.supplyProgress,
            APIprogress: state.progress.API,
        };
    }
)(Supply);