var React = require('react');
var {connect} = require('react-redux');
var {Callout, Button, Column} = require('react-foundation');
var API = require('API');
var {toastr} = require('react-redux-toastr');
var advanceTurn = require('advanceTurn');
var {initiateReset} = require('helpers');
var {showLoading, hideLoading, startAPICall, finishAPICall, hideMenu} = require('Actions');

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
                <Button type="button" className={this.generateButtonClass()} isExpanded onClick={this.finalizeSupply} ref="submit">{this.generateButtonContent()}</Button>
            </Column>
        );
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

        var genrateSupplyElement = function (supply, index) {
            var from = "Warehouse " + names[supply.source_space_id];
            var to =  names[supply.destination_space_id];
            var qty = supply.quantity;

            if(isNaN(to))
                to = "Retailer " + to;
            else
                to = 'Warehouse ' + to;

            return (
                <div key={index}>
                    <Callout className="demand minified">
                        <p>From : {from}</p>
                        <p>To : {to}</p>
                        <p>Qty : {qty}</p>
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
            names: state.names
        };
    }
)(FinalizeSupply);