var React = require('react');
var {connect} = require('react-redux');
var {convertHrtoDays} = require('helpers');
var Supply = require('Supply');

var Warehouse = React.createClass({

    generateContent: function () {
        var {index, warehouses, hr, LayoutSpaces} = this.props;
        var space_id = LayoutSpaces[index].space_id;
        var warehouse = warehouses[space_id];
        
        if (warehouse === undefined)
            return false;

        if (warehouse.active_from > hr) {
            var {day, hr} = convertHrtoDays(warehouse.active_from);
            return (
                <center>
                    <h5>In Construction</h5>
                    <div>Completes on Day {day}, Hr {hr}</div>
                </center>
            );
        }

        return <Supply />;
    },

    render: function () {
        return (
            <div>
                <center><h3>Warehouse</h3></center>
                <hr />
                <div className="scrollable">
                    {this.generateContent()}
                </div>
            </div>
        );
    }

});

module.exports = connect(
    (state) => {
        return {
            index: state.layoutDetails.CurrentIndex,
            LayoutSpaces: state.layoutDetails.LayoutSpaces,
            warehouses: state.warehouses,
            hr: state.userDetails.hr
        };
    }
)(Warehouse);