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
      return <Game />;

  },

  render : function () {
    return (
      <div id="outer-container">
        <SideBar />
        <div id="page-wrap">
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
