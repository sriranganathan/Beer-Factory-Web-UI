var React = require('react');
var {connect} = require('react-redux');

var Supply = React.createClass({

    render: function () {
        var {index, warehouses, LayoutSpaces} = this.props;
        var space_id = LayoutSpaces[index].space_id;
        var warehouse = warehouses[space_id];

        return (
            <div className="minified">
                <p>Stock : {warehouse.stock}</p>
                <br />
                <p>API Call to be implemented</p>
            </div>
        );
    }

});

module.exports = connect(
    (state) => {
        return {
            index: state.layoutDetails.CurrentIndex,
            LayoutSpaces: state.layoutDetails.LayoutSpaces,
            warehouses: state.warehouses
        };
    }
)(Supply);