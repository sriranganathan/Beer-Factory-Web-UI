var React = require('react');
var LoginAPI = require('LoginAPI');
var { Colors, Button, Row, Column, Alignments, Callout } = require('react-foundation');

var Login = React.createClass({

  getInitialState : function () {
    return {
      err_msg: null
    };
  },

  handleSubmit : function (e) {
    e.preventDefault();

    var email = this.refs.email;
    var password = this.refs.password;
    var submit = this.refs.submit;

    submit.className = "button primary expanded disabled";
    submit.value = "Logging In...";

    email = email.value;
    password = password.value;

    var success = (data) => {
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("auth_token", data.auth_token);
      this.props.handleStateChange(data);
    };

    var failure = (error) => {
      var msg = error.message;
      this.setState({
        err_msg: msg
      });

      submit.className = "button primary expanded hollow";
      submit.value = "Start Playing";
    };

    LoginAPI(email, password, this.props.API_BASE_URL).then(success, failure);

  },

  render : function () {
    var error = null
    if (this.state.err_msg) {
      error = (
          <Row>
            <Column>
              <p className="login__err-msg">Error Loggin in : {this.state.err_msg}</p>
            </Column>
          </Row>
      );
    }
    return (
      <Column medium={6} large={4} offsetOnMedium={3} offsetOnLarge={4}>
        <Callout className="login__div">
          <p className="lead login__title">Beer Factory - Login</p>
          {error}
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Column>
                <input id="email" type="email" ref="email" placeholder="Email" required/>
              </Column>
            </Row>
            <Row>
              <Column>
                <input id="password" type="password" ref="password" placeholder="Password" required/>
              </Column>
            </Row>
            <Row>
              <Column small={8} offsetOnSmall={2}>
                <input type="submit" className="hollow button primary expanded" ref="submit" value="Start Playing"/>
              </Column>
            </Row>
          </form>
        </Callout>
      </Column>
    );
  }
});

module.exports = Login;
