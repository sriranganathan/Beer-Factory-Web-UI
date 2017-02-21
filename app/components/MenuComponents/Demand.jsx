var React = require('react');
var {Callout, Colors, Row} = require('react-foundation');
var {convertHrtoDays} = require('helpers');

var Demand = React.createClass({

  generateContent: function (demand) {
    var {day, hr} = convertHrtoDays(demand.end_hr);
    if (demand.name) {
      return (
        <Callout className="demand minified">
            <p>From - {demand.name}</p>
            <p>Total Demand - {demand.demand_qty}</p>
            <p>Supplied Qty - {demand.supplied_qty}</p>
            <p>Remaning Qty - {demand.demand_qty - demand.supplied_qty}</p>
            <p>Expires On - Day {day}, Hr {hr}</p>
        </Callout>
      );
    }

    return (
      <Callout className="demand minified">
          <p>Total Demand - {demand.demand_qty}</p>
          <p>Supplied Qty - {demand.supplied_qty}</p>
          <p>Remaning Qty - {demand.demand_qty - demand.supplied_qty}</p>
          <p>Expires On - Day {day}, Hr {hr}</p>
      </Callout>
    );

  },

  render: function () {
    var {demand} = this.props;
    return (
      <div>
        {this.generateContent(demand)}
      </div>
    );
  }

});

module.exports = Demand;