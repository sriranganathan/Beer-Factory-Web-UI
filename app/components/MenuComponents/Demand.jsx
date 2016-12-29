var React = require('react');
var {Callout, Colors} = require('react-foundation');

var Demand = React.createClass({

  render: function () {
    var {demand} = this.props;
    return (
      <div>
        <Callout className="demand">
            <div>Total Demand - {demand.demand_qty}</div>
            <div>Supplied Qty - {demand.supplied_qty}</div>
            <div>Remaning Qty - {demand.demand_qty - demand.supplied_qty}</div>
        </Callout>
      </div>
    );
  }

});

module.exports = Demand;