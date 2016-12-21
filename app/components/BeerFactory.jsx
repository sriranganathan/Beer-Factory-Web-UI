var React = require('react');
var Login = require('Login');
var Game = require('Game');

var BeerFactory = React.createClass({

  getInitialState : function () {
    var user_id = localStorage.getItem("user_id");
    var auth_token = localStorage.getItem("auth_token");

    return {
      user_id: user_id,
      auth_token: auth_token,
    };
  },

  getDefaultProps : function () {
    const API_BASE_URL = "http://localhost:8000/api/";

    return {
      API_BASE_URL: API_BASE_URL
    };
  },

  handleStateChange : function (modified_state) {
    this.setState(modified_state);
  },

  render : function () {
    var user_id = this.state.user_id;
    var auth_token = this.state.auth_token;

    if(user_id === null) { // The user has not logged in (localStorage is empty)
      return (
        <Login handleStateChange={this.handleStateChange} API_BASE_URL=
          {this.props.API_BASE_URL} />
      );
    }
    else {
      return (
        <Game user_id={user_id} auth_token={auth_token} API_BASE_URL=
          {this.props.API_BASE_URL} handleStateChange={this.handleStateChange} />
      );
    }
  }

});

module.exports = BeerFactory;
