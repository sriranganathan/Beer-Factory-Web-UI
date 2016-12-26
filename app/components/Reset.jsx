var React = require('react');
var {connect} = require('react-redux');
var {setUserCredentials, setLayoutSpace} = require('Actions');
var {toastr} = require('react-redux-toastr');

var Reset = React.createClass({

    initiateReset: function () {
        var {dispatch} = this.props;
        dispatch(setLayoutSpace([]));
        dispatch(setUserCredentials(null, null));
    },

    render: function () {
        this.initiateReset();
        return (
            <h1>Check leader-board</h1>
        );
    }

});

module.exports = connect()(Reset);