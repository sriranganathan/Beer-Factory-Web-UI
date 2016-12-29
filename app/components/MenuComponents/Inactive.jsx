var React = require('react');
var {convertHrtoDays} = require('helpers');

var Inactive = React.createClass({

    render: function () {
        var {desc, activation_hr} = this.props;
        var {day, hr} = convertHrtoDays(activation_hr);
        return (
            <div>
                <center>
                    <h3>{desc}</h3>
                    <hr />
                    <h5>Currently Inactive</h5>
                    <div>Activates on Day {day}, Hr {hr}</div>
                </center>
            </div>
        );
    }

});

module.exports = Inactive;