var React = require('react');
var {Callout, Colors, Row} = require('react-foundation');
var {convertHrtoDays} = require('helpers');

var PendingOrderElement = React.createClass({

  render: function () {
    var {start, end, qty} = this.props;
    var {day, hr} = convertHrtoDays(start);
    start = `Day ${day}, Hr ${hr}`;
    var {day, hr} = convertHrtoDays(end);
    end = `Day ${day}, Hr ${hr}`;
    return (
      <Row>
        <Callout className="demand">
            <p>Placed on - {start}</p>
            <p>Arrives on - {end}</p>
            <p>Order Qty - {qty}</p>
        </Callout>
      </Row>
    );
  }

});

module.exports = PendingOrderElement;