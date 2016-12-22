var React = require('react');
var Login = require('Login');
var Game = require('Game');
var {connect} = require('react-redux');

var BeerFactory = React.createClass({

  render : function () {
    var user_id = this.props.user_id;
    var auth_token = this.props.auth_token;

    if(user_id === null) { // The user has not logged in (localStorage is empty)
      return <Login />;
    }
    else {
      return <Game />;
    }
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
