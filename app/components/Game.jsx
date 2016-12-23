var React = require('react');
var {connect} = require('react-redux');
var {showMenu} = require('Actions');

var Game = React.createClass({

  handleClick : function() {
    this.props.dispatch(showMenu());
  },

  render : function () {
    var user_id = this.props.user_id;
    var auth_token = this.props.auth_token;

    return (
      <div>
        <h1>This is the Game component This is the Game component This is the Game component</h1>
        <p>
          The user going to play the game is {user_id} and is validated by the
          auth token : {auth_token}
        </p>
        <button className="button" onClick={this.handleClick}>Click me to toggle the Menu</button>
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
