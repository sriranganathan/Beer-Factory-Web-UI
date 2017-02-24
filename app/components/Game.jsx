var React = require('react');
var LayoutList = require('LayoutList');
var {connect} = require('react-redux');
var {showMenu} = require('Actions');
var Navbar = require('Navbar');
var Assistant = require('Assistant');

var Game = React.createClass({

  handleClick : function() {
    this.props.dispatch(showMenu());
  },

  generateAssistant: function () {
    var {assistant} = this.props;
    if (assistant.display) {
      return (
        <Assistant style={{position:'absolute', top: '0', left: '0', zIndex: '1000', height:'100%', width:'100%'}}/>
      );
    }
    return false;
  },

  render : function () {
    var user_id = this.props.user_id;
    var auth_token = this.props.auth_token;

    return (
      <div className="container">
        <Navbar />
        <LayoutList />
        {this.generateAssistant()}
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      user_id: state.userDetails.user_id,
      auth_token: state.userDetails.auth_token,
      assistant: state.assistant
    };
  }
)(Game);
