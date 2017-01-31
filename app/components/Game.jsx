var React = require('react');
var LayoutList = require('LayoutList');
var {connect} = require('react-redux');
var {showMenu} = require('Actions');
var Navbar = require('Navbar');

var Game = React.createClass({

  handleClick : function() {
    this.props.dispatch(showMenu());
  },

  render : function () {
    var user_id = this.props.user_id;
    var auth_token = this.props.auth_token;

    return (
      <div className="container">
        <Navbar />
        <LayoutList />
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
)(Game);
