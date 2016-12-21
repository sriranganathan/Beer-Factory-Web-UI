var React = require('react');

var Game = React.createClass({
  render : function () {
    var user_id = this.props.user_id;
    var auth_token = this.props.auth_token;

    return (
      <div>
        <h1>This is the Game component</h1>
        <p>
          The user going to play the game is {user_id} and is validated by the
          auth token : {auth_token}
        </p>
      </div>
    );
  }
});

module.exports = Game;
