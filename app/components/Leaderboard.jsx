var React = require('react');
var {connect} = require('react-redux');
var {initiateReset, convertHrtoDays} = require('helpers');
var {toastr} = require('react-redux-toastr');
var advanceTurn = require('advanceTurn');
var API = require('API');
var {Button, Colors} = require('react-foundation');

var Leaderboard = React.createClass({

  getInitialState: function () {
    return {
      rank: false
    };
  },

  componentDidMount: function () {

    var {factory, user_id, auth_token, dispatch} = this.props;

    if (Object.keys(factory).length === 0) {
      advanceTurn({user_id, auth_token}, dispatch);
    }

    var success = (data) => {
      var rank = data.rank;
      this.setState({
        rank
      });
    };

    var failure = (error) => {
      toastr.error('Network Error', 'Please check Network Connection again');
    };

    API.request('/get_rank', {user_id, auth_token}).then(success, failure);

  },

  handleClick: function (type) {
    var links = {
      leaderboard: '/leaderboard',
      game: '/#',
      logout: '/#'
    }
    if(type === 'logout') {
      return () => {initiateReset(this.props.dispatch);window.location = links[type];};
    } else {
      return () => {window.location = links[type];}
    }
  },

  generateNav: function () {

    var style = {
      marginRight: '6px'
    };
    if(this.props.hr < 360)
      return (
        <div>
          {/*<Button style = {style} color={Colors.PRIMARY} onClick={this.handleClick('leaderboard')}>Leaderboard</Button>*/}
          <Button style = {style} color={Colors.SUCCESS} onClick={this.handleClick('game')}>Continue Game</Button>
          <Button style = {style} color={Colors.ALERT} onClick={this.handleClick('logout')}>Logout</Button>
        </div>
      );
    else 
      return (
        <div>
          <Button style = {style} color={Colors.PRIMARY} onClick={this.handleClick('leaderboard')}>Leaderboard</Button>
          <Button style = {style} color={Colors.ALERT} onClick={this.handleClick('logout')}>Logout</Button>
        </div>
      );

  },

  generateContent: function () {

    var {factory} = this.props;
    var {rank} = this.state;

    if(Object.keys(factory).length !== 0 && rank !== false) {
      var {day, hr} = convertHrtoDays(this.props.hr);
      return (
        <div style={{color: 'white', fontSize:'1.3rem'}}>
          <p>The Main event Starts tomorrow!</p>
        </div>
      );
    } else {
      return (
        <div style={{color: 'white', fontSize:'1.3rem'}}>
            <p>Wait while we crunch some numbers...</p>
        </div>
      );
    }
  },

  render : function () {
    return (
      <div>
        <br />
        <br />
        <center>
            <h1 style={{color:'#3498db'}}>Beer Factory '17</h1>
            <h3 style={{color:'#3498db'}}>User Status</h3>
            <br />
            {this.generateContent()}
            <br />
            {this.generateNav()}
        </center>
      </div>
    );
  }
});

module.exports = connect(
    (state) => {
        return {
            user_id: state.userDetails.user_id,
            auth_token: state.userDetails.auth_token,
            hr: state.userDetails.hr,
            factory: state.factory
        }
    }
)(Leaderboard);
