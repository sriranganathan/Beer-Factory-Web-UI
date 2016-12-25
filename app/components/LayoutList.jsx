var React = require('react');
var {connect} = require('react-redux');
var LayoutElement = require('LayoutElement');
var Loader = require('Loader');
var API = require('API');
var {setUserCredentials, setLayoutSpace} = require('Actions');
var {toastr} = require('react-redux-toastr');

var LayoutList = React.createClass({

  fetchLayoutSpaces: function () {

    var success = (data) => {
      var {dispatch} = this.props;
      dispatch(setLayoutSpace(data.layout_spaces));
    };

    var failure = (error) => {
      var msg = error.message;
      if(msg === '401') {
        var {dispatch} = this.props;
        dispatch(setUserCredentials(null, null));
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

  render: function () {
    if(this.props.LayoutSpaces.length === 0) {
      this.fetchLayoutSpaces();
      return (
        <div id="main-loader">
          <Loader />
        </div>
      );
    }else {
      return (
        <div>
          {this.generateList()}
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
      auth_token: state.userDetails.auth_token
    };
  }
)(LayoutList);
