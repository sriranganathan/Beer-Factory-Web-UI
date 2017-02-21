var React = require('react');
var API = require('API');
var {connect} = require('react-redux');
var {setUserCredentials} = require('Actions');
var { Colors, Button, Row, Column, Alignments, Callout } = require('react-foundation');

var Login = React.createClass({

    launchIntoFullscreen: function (element) {
      if(element.requestFullscreen) {
          element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
          element.msRequestFullscreen();
      }
    },

  handleSubmit : function (e) {
    e.preventDefault();

    var email = this.refs.email;
    var password = this.refs.password;
    var submit = this.refs.submit;

    this.refs.err_msg.innerHTML = "";
    submit.className = "button primary expanded disabled";
    submit.value = "Logging In...";

    email = email.value;
    password = password.value;

    var success = (data) => {
      var {dispatch} = this.props;
      dispatch(setUserCredentials(data.user_id, data.auth_token));
    };

    var failure = (error) => {
      this.refs.err_msg.innerHTML = "Error : <i><b>" + error.message + "</i></b>";

      submit.className = "button primary expanded";
      submit.value = "Start Playing";
    };

    var data = {
      user_email: email,
      user_pass: password
    }

    API.request('/login', data).then(success, failure);
    this.launchIntoFullscreen(document.documentElement);

  },

  render : function () {
    return (
      <Column className="container" id="container">
        <Callout className="login__div">
          <p className="lead login__title">Beer Factory - Login</p>
          <Row>
            <Column>
              <p className="login__err-msg" ref="err_msg"></p>
            </Column>
          </Row>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Column>
                <input className="linput" id="email" type="email" ref="email" placeholder="Email" required/>
              </Column>
            </Row>
            <Row>
              <Column>
                <input className="linput" id="password" type="password" ref="password" placeholder="Password" required/>
              </Column>
            </Row>
            <Row>
              <Column small={8} offsetOnSmall={2}>
                <input type="submit" className="button primary expanded" ref="submit" value="Start Playing"/>
              </Column>
            </Row>
          </form>
        </Callout>
      </Column>
    );
  }
});

module.exports = connect()(Login);
