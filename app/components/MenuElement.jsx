var React = require('react');
var {connect} = require('react-redux');
var UserFactory = require('UserFactory');
var Retailer = require('Retailer');
var {Row, Column} = require('react-foundation');
var Inactive = require('Inactive');
var {initiateReset, convertHrtoDays} = require('helpers');
var API = require('API');
var {toastr} = require('react-redux-toastr');
var advanceTurn = require('advanceTurn');
var {showLoading, hideLoading} = require('Actions');

var MenuElement = React.createClass({

  getInitialState: function () {
    return {
      isClicked: false
    };
  },

  generateContent: function() {

    var {index, space, hr} = this.props;
    
    if (space === undefined)
      return false;

    if(space.activation_hr > hr)
      return <Inactive desc={space.description} activation_hr={space.activation_hr}/>

    switch(space.description) {
      case 'USER FACTORY':
        return <UserFactory />;
      case 'RETAILER':
        return <Retailer />;
      default:
        return <center><h3>{space.description}</h3></center>;
    }


  },

  handleClick: function () {

    if(this.state.isClicked) {
      return false;
    }

    var submit = document.getElementById('skip-turn');
    submit.innerHTML = 'Skipping';
    submit.id = 'skip-turn-disabled';
    this.setState({
      isClicked: true
    });
    
    var {user_id, auth_token, dispatch} = this.props;
    var data = {
      user_id,
      auth_token
    };
    
    var success = (data) => {
      submit.innerHTML = 'Skip Turn';
      submit.id = 'skip-turn';

      this.setState({
        isClicked: false
      });
      
      advanceTurn({user_id, auth_token}, dispatch);
      toastr.success('Success', 'Skipped Turn Successfully');
    }

    var failure = (error) => {
      var msg = error.message;
      if(msg === '401') {
        initiateReset(this.props.dispatch);
        toastr.error('Invalid Credentials', 'Please Login Again');
      } else {
        submit.innerHTML = 'Skip Turn';
        submit.id = 'skip-turn';

        this.setState({
          isClicked: false
        });

        toastr.error('Error', msg);
        dispatch(hideLoading());
      }
    };

    dispatch(showLoading());
    API.request('/no_operation', data).then(success, failure);
  },

  generateFooter: function () {
    var {factory, hr} = this.props;
    var {day, hr} = convertHrtoDays(hr);
    return (
      <div id="menu-footer">
      <Row>
        <Column className="menu-detail" id="skip-turn" onClick={this.handleClick} small={5}>Skip Turn</Column>
        <Column className="menu-detail" small={7}>Day {day}, hr {hr}</Column>
        <Column className="menu-detail" small={7}>Score - {factory.user_score}</Column>
        <Column className="menu-detail" small={5}>₹ {factory.money}</Column>
      </Row>
      </div>
    );
  },

  render: function () {

    return (
      <div className="container menu-container">
        <div className="menu-element-container">
          {this.generateContent()}
        </div>
        {this.generateFooter()}
      </div>
    );

  }

});

module.exports = connect(
  (state) => {
    return {
      index: state.layoutDetails.CurrentIndex,
      space: state.layoutDetails.LayoutSpaces[state.layoutDetails.CurrentIndex],
      factory: state.factory,
      hr: state.userDetails.hr,
      user_id: state.userDetails.user_id,
      auth_token: state.userDetails.auth_token
    };
  }
)(MenuElement);
