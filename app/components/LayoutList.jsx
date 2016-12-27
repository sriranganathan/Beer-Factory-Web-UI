var React = require('react');
var {connect} = require('react-redux');
var LayoutElement = require('LayoutElement');
var Loader = require('Loader');
var API = require('API');
var {setUserCredentials, setLayoutSpace, setUserHr, setGameState} = require('Actions');
var {initiateReset} = require('helpers');
var {toastr} = require('react-redux-toastr');
var advanceTurn = require('advanceTurn');

var LayoutList = React.createClass({

  fetchLayoutSpaces: function () {

    var success = (data) => {
      var {dispatch} = this.props;
      dispatch(setUserHr(data.user.hr));
      dispatch(setLayoutSpace(data.layout_spaces));
      dispatch(setGameState({
        actions: data.actions,
        advertisements: data.advertisements,
        costTypes: data.cost_types,
        upgrades: data.upgrades
      }));
    };

    var failure = (error) => {
      var msg = error.message;
      if(msg === '401') {
        initiateReset(this.props.dispatch);
        toastr.error('Invalid Credentials', 'Please Login Again');
      } else {
        toastr.error('Error', msg);
      }
    };

    var {user_id, auth_token} = this.props;
    var data = {
      user_id,
      auth_token
    };

    API.request('/get_game_state', data).then(success, failure);
  },

  generateElement: function(element, index) {
    return <LayoutElement key={index} index={index}/>
  },

  generateList: function() {
    var {LayoutSpaces} = this.props;
    return LayoutSpaces.map(this.generateElement);

  },

  componentDidMount: function () {

    if(!this.props.isGameStateSet) {
      this.fetchLayoutSpaces();
    }

    var {user_id, auth_token, dispatch} = this.props;
    var data = {
      user_id,
      auth_token
    };
    advanceTurn(data, dispatch);

  },

  generateBackgroundLoader: function () {
    if(this.props.isLoading) {
      return (
        <div id="background-loader">
          <Loader />
        </div>
      );
    }
    return false;
  },

  render: function () {
    if(!this.props.isGameStateSet) {
      return (
        <div id="main-loader">
          <Loader />
        </div>
      );
    }else {
      return (
        <div>
          <div id="layout-container">
            {this.generateList()}
          </div>
          {this.generateBackgroundLoader()}
        </div>
      );
    }
  }

});

module.exports = connect(
  (state) => {
    return {
      LayoutSpaces: state.layoutDetails.LayoutSpaces,
      user_id: state.userDetails.user_id,
      auth_token: state.userDetails.auth_token,
      isGameStateSet: (state.layoutDetails.LayoutSpaces.length !== 0 && state.gameDetails !== null),
      isLoading: state.misc.isLoading
    };
  }
)(LayoutList);
