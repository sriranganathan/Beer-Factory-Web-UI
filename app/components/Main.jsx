var React = require('react');
var Toastr = require('Toastr');

var Main = React.createClass({
  render : function() {
    return (
      <div>
            {this.props.children}
            <Toastr />
      </div>
    );
  }
});

module.exports = Main;
