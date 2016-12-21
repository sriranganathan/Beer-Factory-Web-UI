var React = require('react');

var Main = (props) => {
  return (
    <div>
          <p>Web based UI for Beer Factory</p>
          {props.children}
    </div>
  );
}

module.exports = Main;
