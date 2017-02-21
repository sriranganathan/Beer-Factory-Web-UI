var React = require('react');
var {connect} = require('react-redux');

var Stock = React.createClass({

    generateStockList: function () {
        var {warehouses, names} = this.props;

        var generateStock = function (warehouse, k) {
            var name = names[k];
            return (
                <p key={k}>Warehouse {name} - {warehouse.stock}</p>
            );
        }

        var result = Array(Object.keys(warehouses).length)
        for(var k in warehouses) {
            result[Math.floor(names[k])-1] = generateStock(warehouses[k], k);
        }

        return result;
    },

    render: function () {
        return (
            <div>
                <center><h3>Stock</h3></center>
                <hr />
                <div id="scrollable">
                    {this.generateStockList()}
                </div>
            </div>
        );
    }

});

module.exports = connect(
  (state) => {
    return {
        warehouses: state.warehouses,        
        names: state.names
    };
  }
)(Stock);