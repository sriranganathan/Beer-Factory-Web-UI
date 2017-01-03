var React = require('react');
var {connect} = require('react-redux');
var API = require('API');
var {toastr} = require('react-redux-toastr');
var advanceTurn = require('advanceTurn');
var {initiateReset, convertHrtoDays} = require('helpers');
var {showLoading, hideLoading, setUpgradeProgress, startAPICall, finishAPICall} = require('Actions');

var Advertisement = React.createClass({

    generateButtonClass: function () {
        if(this.props.APIprogress)
            return "button success expanded disabled";
        else
            return "button success expanded";
    },

    renderForm: function (cost, available) {
        if (cost > available) {
            return <p>Insufficient Money to Advertise</p>
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="submit" className={this.generateButtonClass()} ref="submit" value="Advertise"/>
            <p className="login__err-msg menu-messages" ref="err_msg"></p>
            </form>
        );
    },

    handleSubmit: function (e) {
        e.preventDefault();

        if(this.props.APIprogress)
            return false;

        var submit = this.refs.submit;

        this.refs.err_msg.innerHTML = "";

        var {factory, advertisements, index} = this.props;
        var ad = advertisements[index];

        //check for money constraints
        if (ad.advertisement_cost > factory.money) {
            this.refs.err_msg.innerHTML = 'Insufficient Money to Advertise';
            return false;
        }

        //Procede with API call
        submit.value = "Starting...";
        var {user_id, auth_token, dispatch, CurrentIndex, LayoutSpaces} = this.props;
        var space = LayoutSpaces[CurrentIndex];

        var data = {
            user_id,
            auth_token,
            space_id: space.space_id,
            ad_id: ad.advertisement_id
        };

        var success = (data) => {
            dispatch(finishAPICall());
            submit.value = "Advertise";

            advanceTurn({user_id, auth_token}, dispatch);
            toastr.success('Success', 'Advertised Successfully');
        };

        var failure = (error) => {
            dispatch(finishAPICall());
            var msg = error.message;
            if(msg === '401') {
                initiateReset(this.props.dispatch);
                toastr.error('Invalid Credentials', 'Please Login Again');
            } else {
                submit.value = "Advertise";
                toastr.error('Error', msg);
                dispatch(hideLoading());
            }
        };

        dispatch(showLoading());
        dispatch(startAPICall());
        API.request('/advertise', data).then(success, failure);
    },

    render: function () {
        var {advertisements, index, factory} = this.props;
        console.log(advertisements, index);
        var ad = advertisements[index];
        return (
            <div>
                <p>Ad Type: {ad.advertisement_desc}</p>
                <p>Ad Cost: {ad.advertisement_cost}</p>
                <p>Ad Intensity: {ad.advertisement_intensity*100}%</p>
                <br />
                {this.renderForm(ad.advertisement_cost, factory.money)}
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
            advertisements: state.gameDetails.advertisements,
            APIprogress: state.progress.API,
            LayoutSpaces: state.layoutDetails.LayoutSpaces,
            CurrentIndex: state.layoutDetails.CurrentIndex
        };
    }
)(Advertisement);