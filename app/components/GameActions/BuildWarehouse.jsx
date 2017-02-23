var React = require('react');
var {connect} = require('react-redux');
var API = require('API');
var {toastr} = require('react-redux-toastr');
var advanceTurn = require('advanceTurn');
var {initiateReset, convertHrtoDays} = require('helpers');
var {showLoading, hideLoading, setUpgradeProgress, startAPICall,
     finishAPICall, addPendingWarehouse} = require('Actions');

var BuildWarehouse = React.createClass({

    generateButtonClass: function () {
        if(this.props.APIprogress)
            return "button success expanded disabled";
        else
            return "button success expanded";
    },

    handleSubmit: function (e) {
        e.preventDefault();

        if(this.props.APIprogress)
            return false;

        var submit = this.refs.submit;

        this.refs.err_msg.innerHTML = "";

        var {factory, costTypes} = this.props;

        //check for money constraints
        if (costTypes.BUILD_WAREHOUSE_COST.unit_cost > factory.money) {
            this.refs.err_msg.innerHTML = 'Insufficient Money to build warehouse';
            return false;
        }

        //Procede with API call
        submit.value = "Starting...";
        var {user_id, auth_token, dispatch, index, LayoutSpaces} = this.props;
        var space = LayoutSpaces[index];

        var data = {
            user_id,
            auth_token,
            space_id: space.space_id
        };

        var success = (data) => {
            dispatch(finishAPICall());
            submit.value = "Build Warehouse";

            var {actions, currentHr} = this.props;
            var end = actions.BUILD_WAREHOUSE.req_hr + currentHr;

            dispatch(addPendingWarehouse({
                'active_from': end,
                'ware_space': space.space_id
            }));

            advanceTurn({user_id, auth_token}, dispatch);
            toastr.success('Success', 'Building Warehouse Started');
        };

        var failure = (error) => {
            dispatch(finishAPICall());
            var msg = error.message;
            if(msg === '401') {
                initiateReset(this.props.dispatch);
                toastr.error('Invalid Credentials', 'Please Login Again');
            } else {
                submit.value = "Build Warehouse";
                toastr.error('Error', msg);
                dispatch(hideLoading());
            }
        };

        dispatch(showLoading());
        dispatch(startAPICall());
        API.request('/build_warehouse', data).then(success, failure);


    },

    renderForm: function (cost, available) {
        if (cost > available) {
            return <p>Insufficient Money to Build Warehouse</p>
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="submit" className={this.generateButtonClass()} ref="submit" value="Build Warehouse"/>
            <p className="login__err-msg menu-messages" ref="err_msg"></p>
            </form>
        );
    },

    render: function () {
        var {factory, costTypes, actions, currentHr} = this.props;
        var requiredHrs = actions.BUILD_WAREHOUSE.req_hr;
        var {day, hr} = convertHrtoDays(currentHr + requiredHrs);
        var cost = costTypes.BUILD_WAREHOUSE_COST.unit_cost;

        return (
            <div className="minified">
                <p>Warehouse Cost : {cost}</p>
                <p>Completion : Day {day}, Hr {hr}</p>
                <br />
                {this.renderForm(cost, factory.money)}
            </div>
        );
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
            LayoutSpaces: state.layoutDetails.LayoutSpaces,
            index: state.layoutDetails.CurrentIndex
        };
    }
)(BuildWarehouse);