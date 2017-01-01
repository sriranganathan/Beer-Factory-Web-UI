var React = require('react');
var {connect} = require('react-redux');
var {Row, Column} = require('react-foundation');
var API = require('API');
var {toastr} = require('react-redux-toastr');
var advanceTurn = require('advanceTurn');
var {initiateReset, convertHrtoDays} = require('helpers');
var {showLoading, hideLoading, setUpgradeProgress} = require('Actions');

var Order = React.createClass({

    handleSubmit: function (e) {
        e.preventDefault();
        
        var submit = this.refs.submit;

        this.refs.err_msg.innerHTML = "";
    
        var {factory, upgrades, currentHr, progress} = this.props;
        var upgrade = upgrades[factory.level + 1];

        //check whether an upgrade is already in progress
        if(progress !== null && progress > currentHr) {
            this.refs.err_msg.innerHTML = `Upgrade Already in Progress`;
            return false;  
        }

        // check whether upgrade exists
        if(upgrade === undefined) {
            this.refs.err_msg.innerHTML = `No More upgrades available`;
            return false;
        }

        // check for money constraints
        if(upgrade.cost > factory.money) {
            this.refs.err_msg.innerHTML = `Upgrade Cost(₹${upgrade.cost}) exceeds available money`;
            return false;
        }

        //Procede with API call
        submit.className = "button success expanded disabled";
        submit.value = "Starting...";
        var {user_id, auth_token, dispatch} = this.props;
        
        var data = {
            user_id,
            auth_token
        };

        var success = (data) => {
            var {actions} = this.props;
            var req_hr = actions.UPGRADE_ACTION.req_hr
            dispatch(setUpgradeProgress(req_hr + currentHr))

            submit.className = "button success expanded";
            submit.value = "Upgrade";

            advanceTurn({user_id, auth_token}, dispatch);
            toastr.success('Success', 'Upgradtion Started');
        }

        var failure = (error) => {
            var msg = error.message;
            if(msg === '401') {
                initiateReset(this.props.dispatch);
                toastr.error('Invalid Credentials', 'Please Login Again');
            } else {
                submit.className = "button success expanded";
                submit.value = "Upgrade";
                toastr.error('Error', msg);
                dispatch(hideLoading());
            }
        };

        dispatch(showLoading());
        API.request('/upgrade', data).then(success, failure);

    },

    renderForm: function(cost, available) {
    
        if (cost > available) {
            return <p>Insufficient Money to Upgrade</p>
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="submit" className="button success expanded" ref="submit" value="Upgrade"/>
            <p className="login__err-msg menu-messages" ref="err_msg"></p>
            </form>
        );

    },

    render: function () {
        var {factory, upgrades, currentHr, actions, progress} = this.props;
        var requiredHrs = actions.UPGRADE_ACTION.req_hr;
        var {day, hr} = convertHrtoDays(currentHr + requiredHrs);
        var upgrade = upgrades[factory.level + 1];
        if (progress !== null && progress > currentHr) {
            var {day, hr} = convertHrtoDays(progress);
            return (
                <div className="minified">
                    <p>Upgradation in Progress</p>
                    <p>Completion - Day {day}, Hr {hr}</p>
                </div>
            );
        }
        if(upgrade === undefined) {
            return (
                <div className="minified">
                    <p>No more Upgrades</p>
                </div>
            );
        }
        return (
            <div className="minified">
                <p>Current Capacity : {factory.capacity}</p>
                <p>Upgraded Capacity : {upgrade.capacity}</p>
                <p>Upgrade Cost : {upgrade.cost}</p>
                <p>Completion : Day {day}, Hr {hr}</p>
                <br />
                {this.renderForm(upgrade.cost, factory.money)}
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
            upgrades: state.gameDetails.upgrades,
            actions: state.gameDetails.actions,
            currentHr: state.userDetails.hr,
            progress: state.progress.upgrade
        }
    }
)(Order);