var React = require('react');
var {connect} = require('react-redux');
var {Callout, Button, Column, Link, Sizes, Colors} = require('react-foundation');
var API = require('API');
var {toastr} = require('react-redux-toastr');
var advanceTurn = require('advanceTurn');
var {initiateReset, TransportTime, transformPendingSupplies} = require('helpers');
var {showLoading, hideLoading, startAPICall, finishAPICall, hideMenu, setSupplyProgress, addPendingSupplies} = require('Actions');

var FinalizeSupply = React.createClass({

    generateButtonClass: function () {
        if(this.props.APIprogress)
            return "button success expanded disabled no-margin-bottom";
        else
            return "button success expanded no-margin-bottom"
    },

    generateButtonContent: function () {
        if(this.props.APIprogress)
            return "Starting...";
        else
            return "Make Supplies";
    },

    finalizeSupply: function () {
        //var submit = this.refs.submit;
        var {supplyProgress, user_id, auth_token, dispatch} = this.props;

        //submit.value = "Starting...";
        var data = {
            user_id,
            auth_token,
            supply_req: JSON.stringify(supplyProgress) 
        };

        var success = (data) => {
            dispatch(finishAPICall());
            dispatch(hideMenu());

            var {current_hr, LayoutSpaces} = this.props;
            var transformSupplies = (supplyProgress) => {
                var result = [];

                var calculateTime = (supply) => {

                    var findSpace =  (LayoutSpaces, space_id) => {
                        space_id = Math.floor(space_id);
                        for(var k in LayoutSpaces) {
                            if (LayoutSpaces[k].space_id === space_id)
                                return LayoutSpaces[k];
                        }
                        return false;
                    };

                    var space1 = findSpace(LayoutSpaces, supply.source_space_id);
                    var space2 = findSpace(LayoutSpaces, supply.destination_space_id);
                    
                    var x1 = space1.loc_x;
                    var y1 = space1.loc_y;
                    var x2 = space2.loc_x;
                    var y2 = space2.loc_y;

                    var NORMAL_TRANSPORT_TIME = 0.5;
                    var transport_time =  TransportTime(x1, y1, x2, y2, NORMAL_TRANSPORT_TIME);

                    return current_hr + transport_time;
                }

                var createSupplyElement = (supply) => {
                    result.push({
                        source_space: supply.source_space_id,
                        dest_space: supply.destination_space_id,
                        supply_qty: supply.quantity,
                        supply_end: calculateTime(supply)
                    });
                };

                supplyProgress.forEach(createSupplyElement);
                return result;
            };

            var pendingSupplies = transformSupplies(supplyProgress);
            dispatch(addPendingSupplies(pendingSupplies));

            //submit.value = "Make Supplies";

            advanceTurn({user_id, auth_token}, dispatch);
            toastr.success('Success', 'Supplies Iniated Successfully');
        };

        var failure = (error) => {
            dispatch(finishAPICall());
            var msg = error.message;
            if(msg === '401') {
                initiateReset(this.props.dispatch);
                toastr.error('Invalid Credentials', 'Please Login Again');
            } else {
                //submit.value = "Make Supplies";
                toastr.error('Error', msg);
                dispatch(hideLoading());
            }
        };

        dispatch(showLoading());
        dispatch(startAPICall());
        API.request('/supply', data).then(success, failure);

    },

    generateButton: function () {
        var {supplyProgress} = this.props;

        if(supplyProgress.length === 0)
            return false;

        return (
            <Column>
                <Button type="button" className={this.generateButtonClass()} isExpanded onClick={this.finalizeSupply}>{this.generateButtonContent()}</Button>
            </Column>
        );
    },

    removeItemFromSupply: function (index) {
        var {dispatch, supplyProgress} = this.props;

        return function () {
            var new_supply = [];
            for(var i in supplyProgress) {
                if (i == index)
                    continue;
                new_supply.push(supplyProgress[i]);
            }
            dispatch(setSupplyProgress(new_supply));
        };
    },

    getDisplayContent: function () {
        var {supplyProgress, names} = this.props;

        if(supplyProgress.length === 0) {
            return (
                <center>
                    Plan Some Supplies First 
                </center>
            );
        }

        var genrateSupplyElement = (supply, index) => {
            var from = "Warehouse " + names[supply.source_space_id];
            var to =  names[supply.destination_space_id];
            var qty = supply.quantity;

            if(isNaN(to))
                to = "Retailer " + to;
            else
                to = 'Warehouse ' + to;

            return (
                <div key={index} style={{position:"relative"}}>
                    <Callout className="demand minified">
                        <p>From : {from}</p>
                        <p>To : {to}</p>
                        <p>Qty : {qty}</p>
                        <Link size={Sizes.TINY} color={Colors.ALERT} onClick={this.removeItemFromSupply(index)} style={{position:"absolute", right:"2px", bottom:"2px"}}>Remove</Link>
                    </Callout>
                </div>
            );
        };

        return supplyProgress.map(genrateSupplyElement);
    },

    render: function () {
        return (
            <div>
                <center><h3>Finalize Supplies</h3></center>
                <hr />
                <div id="scrollable">
                    {this.getDisplayContent()}
                    {this.generateButton()}
                </div>
            </div>
        );
    }

});

module.exports = connect(
    (state) => {
        return {
            user_id: state.userDetails.user_id,
            auth_token: state.userDetails.auth_token,
            supplyProgress: state.supplyProgress,
            names: state.names,
            current_hr: state.userDetails.hr,
            LayoutSpaces: state.layoutDetails.LayoutSpaces
        };
    }
)(FinalizeSupply);