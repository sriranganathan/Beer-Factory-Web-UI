var React = require('react');
var {connect} = require('react-redux');
var {initiateReset, convertHrtoDays} = require('helpers');
var {showMenu, setCurrentIndex} = require('Actions');

var navbar = React.createClass({

    handleScore: function () {
      window.location = '#/leaderboard';
    },

    handleLogout: function () {
      var {dispatch} = this.props;
      initiateReset(dispatch);
    },

    handleNotifications: function () {
        var {dispatch} = this.props;
        dispatch(setCurrentIndex('notifications'));
        dispatch(showMenu());
    },

    handlePendingActions: function () {
        var {dispatch} = this.props;
        dispatch(setCurrentIndex('pending'));
        dispatch(showMenu());
    },

    handleDemands: function () {
        var {dispatch} = this.props;
        dispatch(setCurrentIndex('demands'));
        dispatch(showMenu());
    },

    handleStock: function () {
        var {dispatch} = this.props;
        dispatch(setCurrentIndex('stock'));
        dispatch(showMenu());
    },

    render: function () {
        var {factory, hr} = this.props;
        var {day, hr} = convertHrtoDays(hr);
        return (
           <div className="top-bar" id="navbar">
              <div className="top-bar-title">
                <strong>Beer Factory - DEMO</strong>
              </div>
              <div id="responsive-menu">
                <div className="top-bar-right">
                  <ul className="menu">
                    <li><p>Bal - ₹ {factory.money}</p></li>
                    <li><p>Day {day}, hr {hr}</p></li>
                    <li className="hoverable" onClick={this.handleScore}><p>Score - {factory.user_score}</p></li>
                    <li className="hoverable" onClick={this.handleNotifications}><p>Notifications</p></li>
                    <li className="hoverable" onClick={this.handleDemands}><p>Demands</p></li>
                    <li className="hoverable" onClick={this.handleStock}><p>Stock</p></li>
                    <li className="hoverable" onClick={this.handlePendingActions}><p>Pending</p></li>
                    <li className="hoverable" onClick={this.handleScore}><p>Logout</p></li>
                  </ul>
                </div>
              </div>
            </div>
        );
    }

});

module.exports = connect(
  (state) => {
    return {
      factory: state.factory,
      hr: state.userDetails.hr,
    };
  }
)(navbar);