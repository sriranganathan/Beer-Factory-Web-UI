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
        var total_stock = 0;

        for(var k in warehouses) {
            result[Math.floor(names[k])-1] = generateStock(warehouses[k], k);
            total_stock += warehouses[k].stock;
        }

        var cost_per_beer = this.props.costTypes.INVENTORY_COST.unit_cost;
        var storage_cost = cost_per_beer * total_stock;
        
        var total_stock_element = (
            <div key="-1" className="minified">
                <br />
                <p>Total Stock - {total_stock}</p>
                <p>Storage Cost per Beer - ₹ {cost_per_beer}</p>
                <p>Total Storage Cost -  ₹ {storage_cost}</p>
            </div>
        );

        result.push(total_stock_element);
        return result;
    },

    render: function () {
        return (
            <div>
                <center><h3>Stock</h3></center>
                <hr />
                <center id="scrollable">
                    {this.generateStockList()}
                </center>
            </div>
        );
    }

});

module.exports = connect(
  (state) => {
    return {
        warehouses: state.warehouses,        
        names: state.names,
        costTypes: state.gameDetails.costTypes
    };
  }
)(Stock);