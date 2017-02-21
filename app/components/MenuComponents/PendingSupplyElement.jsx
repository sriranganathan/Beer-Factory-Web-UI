var React = require('react');
var {Callout, Colors, Row} = require('react-foundation');
var {convertHrtoDays} = require('helpers');

var PendingOrderElement = React.createClass({

  render: function () {
    var {end, qty, source, dest} = this.props;
    var {day, hr} = convertHrtoDays(end);
    end = `Day ${day}, Hr ${hr}`;
    return (
      <Row>
        <Callout className="demand">
            <p>Source - {source}</p>
            <p>Dest - {dest}</p>
            <p>Arrives on - {end}</p>
            <p>Supply Qty - {qty}</p>
        </Callout>
      </Row>
    );
  }

});

module.exports = PendingOrderElement;