var React = require('react');
var {connect} = require('react-redux');
var {toastr} = require('react-redux-toastr');
var {initiateReset} = require('helpers');

var Reset = React.createClass({


    componentDidMount: function () {
        initiateReset(this.props.dispatch);
    },

    render: function () {
        return (
            <h1>Check leader-board</h1>
        );
    }

});

module.exports = connect()(Reset);