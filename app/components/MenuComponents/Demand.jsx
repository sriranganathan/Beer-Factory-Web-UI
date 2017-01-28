var React = require('react');
var {Callout, Colors, Row} = require('react-foundation');

var Demand = React.createClass({

  render: function () {
    var {demand} = this.props;
    return (
      <Row>
        <Callout className="demand">
            <p>Total Demand - {demand.demand_qty}</p>
            <p>Supplied Qty - {demand.supplied_qty}</p>
            <p>Remaning Qty - {demand.demand_qty - demand.supplied_qty}</p>
        </Callout>
      </Row>
    );
  }

});

module.exports = Demand;