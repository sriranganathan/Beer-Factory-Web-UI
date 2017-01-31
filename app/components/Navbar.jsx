var React = require('react');

var navbar = React.createClass({

    render: function () {
        return (
           <div className="top-bar" id="navbar">
              <div className="top-bar-title">
                <strong>Beer Factory</strong>
              </div>
              <div id="responsive-menu">
                <div className="top-bar-right">
                  <ul className="menu">
                    <li><a href="#">One</a></li>
                    <li><a href="#">Two</a></li>
                    <li><a href="#">Three</a></li>
                  </ul>
                </div>
              </div>
            </div>
        );
    }

});

module.exports = navbar;