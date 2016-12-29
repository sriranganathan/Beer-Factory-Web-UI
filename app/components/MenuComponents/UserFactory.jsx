var React = require('react');
var {connect} = require('react-redux');

var UserFactory = React.createClass({

    render: function () {
        var {factory} = this.props
        return (
            <div>
                <center><h3>Factory</h3></center>
                <hr />
                <div>
                    <p>Total Capacity : {factory.capacity}</p>
                    <p>Used : {factory.used}</p>
                    <p>Available : {factory.capacity-factory.used}</p>
                    <p></p>
                </div>
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