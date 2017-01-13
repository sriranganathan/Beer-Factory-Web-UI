var React = require('react');
var Login = require('Login');
var Game = require('Game');
var SideBar = require('SideBar');
var {connect} = require('react-redux');

var BeerFactory = React.createClass({

  renderContent : function () {

    var user_id = this.props.user_id;
    var auth_token = this.props.auth_token;

    if(user_id === null)
      return <Login />;
    else
      return (
        <div className="container" id="game-container">
          <Game />
        </div>
      );

  },

  render : function () {
    return (
      <div id="outer-container" className="container">
        <SideBar />
        <div id="page-wrap" className="container">
          {this.renderContent()}
        </div>
      </div>
    );

  }

});

module.exports = connect(
  (state) => {
    return {
      user_id: state.userDetails.user_id,
      auth_token: state.userDetails.auth_token
    };
  }
)(BeerFactory);
