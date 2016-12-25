var React = require('react');

var Loader = React.createClass({

  render : () => {
    return (
      <div id="loader">
        <img style={{height:"100%"}} src="../images/gears.svg" />
      </div>
    );
  }

});

module.exports = Loader;
