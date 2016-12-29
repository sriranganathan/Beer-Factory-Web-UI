var React = require('react');
var {connect} = require('react-redux');

var UserFactory = React.createClass({

    render: function () {
        return (
            <div>
                <center><h3>Factory</h3></center>
            </div>
        );
    }

});

module.exports = connect(
    (state) => {
        return {
            factory: state.factory
        };
    }
)(UserFactory);