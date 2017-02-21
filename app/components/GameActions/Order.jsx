var React = require('react');
var {connect} = require('react-redux');
var {Row, Column, Button, Colors} = require('react-foundation');
var API = require('API');
var {toastr} = require('react-redux-toastr');
var advanceTurn = require('advanceTurn');
var {initiateReset, convertHrtoDays} = require('helpers');
var {showLoading, hideLoading, startAPICall, finishAPICall,
     addPendingOrder} = require('Actions');
var PendingOrderElement = require('PendingOrderElement');

var Order = React.createClass({

    getInitialState: function () {
        return {
            displayPending: false
        };
    },

    getOrderAmt: function() {
        var qty = Math.floor(this.refs.qty.value);
        this.refs.err_msg.innerHTML = "";
        this.refs.info_msg.innerHTML = "";
        if(Number.isNaN(qty) || qty < 0)
            this.refs.info_msg.innerHTML = "Invalid order Qty";
        else {
             var {costTypes} = this.props;
             var order_amt = costTypes.BEER_COST.unit_cost * qty;
            this.refs.info_msg.innerHTML = `Order Amt: ₹ ${order_amt}`;
        }

    },

    generateButtonClass: function () {
        if(this.props.APIprogress)
            return "button success expanded disabled no-margin-bottom";
        else
            return "button success expanded no-margin-bottom";
    },

    handleSubmit: function (e) {
        e.preventDefault();

        if(this.props.APIprogress)
            return false;

        var submit = this.refs.submit;
        var qty = this.refs.qty;

        this.refs.err_msg.innerHTML = "";
        this.refs.info_msg.innerHTML = "";

        var order = Math.floor(qty.value);
    
        // Check for invalid input    
        if(Number.isNaN(order)) {
            this.refs.err_msg.innerHTML = "*Enter a valid Number";
            return false;
        } 

        if(order <= 0) {
            this.refs.err_msg.innerHTML = "Minimum order qty is 1";
            return false;
        }

        var {factory,costTypes, currentHr, actions} = this.props;
        var requiredHrs = actions.FACTORY_ORDER_ACTION.req_hr;
        var end_hr = currentHr + requiredHrs;

        // check for capacity constraints
        if(order > (factory.capacity-factory.used)) {
            this.refs.err_msg.innerHTML = `Order cannot excede Available capacity of ${factory.capacity-factory.used}`;
            return false;
        }

        // check for money constraints
        if(order*costTypes.BEER_COST.unit_cost > factory.money) {
            this.refs.err_msg.innerHTML = `Order amt(₹${order*costTypes.BEER_COST.unit_cost}) exceeds available money`;
            return false;
        }

        //Procede with API call
        submit.value = "Ordering...";
        var {user_id, auth_token, dispatch} = this.props;
        
        var data = {
            user_id,
            auth_token,
            qty: order
        };

        var success = (data) => {
            dispatch(finishAPICall());
            dispatch(addPendingOrder({
                start_hr:currentHr,
                end_hr:end_hr,
                qty:order
            }));
            advanceTurn({user_id, auth_token}, dispatch);
            submit.value = "Order";
            qty.value = '';
            toastr.success('Success', 'Order Placed for' + order);
        }

        var failure = (error) => {
            dispatch(finishAPICall());
            var msg = error.message;
            if(msg === '401') {
                initiateReset(this.props.dispatch);
                toastr.error('Invalid Credentials', 'Please Login Again');
            } else {
                submit.value = "Order";
                toastr.error('Error', msg);
                dispatch(hideLoading());
            }
        };

        dispatch(showLoading());
        dispatch(startAPICall());
        API.request('/place_order', data).then(success, failure);

    },

    handleClick: function (val) {
        return () => {
            this.setState({
                displayPending: val
            });
        };
    },

    generatePendingOrderElement: function (element, index) {
        return <PendingOrderElement
                key={index}
                start={element.start_hr}
                end={element.end_hr}
                qty={element.qty} />;
    },

    generatePendingOrderList: function () {
        var {pendingOrders} = this.props;

        if(Object.keys(pendingOrders).length === 0)
            return 'No Pending Orders';

        var result = [], index=0;

        for(var k in pendingOrders) {
            var cur = pendingOrders[k];
            for(var i in cur) {
                result.push(this.generatePendingOrderElement(cur[i], index));
                index++;
            }
        }

        return result;

    },

    generateContent: function () {
        var {factory, costTypes, currentHr, actions} = this.props;
        var requiredHrs = actions.FACTORY_ORDER_ACTION.req_hr;
        var {day, hr} = convertHrtoDays(currentHr + requiredHrs);

        if(this.state.displayPending)
            return (
                <div className="minified">
                    {this.generatePendingOrderList()}
                    <Column small={12}>
                        <Button type="button" color={Colors.SECONDARY} isExpanded onClick={this.handleClick(false)}>Go Back</Button>
                    </Column>
                </div>
            );

        return (
            <div className="minified">
                <p>Total Capacity : {factory.capacity}</p>
                <p>Used : {factory.used}</p>
                <p>Available : {factory.capacity-factory.used}</p>
                <p>Cost of 1 Beer : ₹ {costTypes.BEER_COST.unit_cost}</p>
                <p>Delivery : Day {day}, Hr {hr}</p>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Column small={12} medium={8} className="stacked-horizontally">
                            <input type="number" ref="qty" placeholder="Enter Qty" onChange={this.getOrderAmt} className="no-margin-bottom" required/>
                        </Column>
                        <Column small={12} medium={4} className="stacked-horizontally">
                            <input type="submit" className={this.generateButtonClass()} ref="submit" value="Order"/>
                        </Column>
                        <Column small={12}>
                            <Button type="button" color={Colors.SECONDARY} isExpanded onClick={this.handleClick(true)}>View Pending Orders</Button>
                        </Column>
                    </Row>
                </form>
                <p ref="info_msg" className="menu-messages"></p>
                <p className="login__err-msg menu-messages" ref="err_msg"></p>
            </div>
        );
    },

    render: function () {
        return this.generateContent();
    }

});

module.exports = connect(
    (state) => {
        return {
            user_id: state.userDetails.user_id,
            auth_token: state.userDetails.auth_token,
            factory: state.factory,
            costTypes: state.gameDetails.costTypes,
            actions: state.gameDetails.actions,
            currentHr: state.userDetails.hr,
            APIprogress: state.progress.API,
            pendingOrders: state.gameDetails.pendingOrders
        }
    }
)(Order);