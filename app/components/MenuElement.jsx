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
var {showLoading, hideLoading, startAPICall, finishAPICall} = require('Actions');
var EmptySpace = require('EmptySpace');
var Warehouse = require('Warehouse');
var FinalizeSupply = require('FinalizeSupply');

var MenuElement = React.createClass({

  generateContent: function() {

    var {index, space, hr} = this.props;
    
    if (space === undefined) {
      if (index === 'finalizeSupply') {
        return <FinalizeSupply />;
      } else {
        return false;
      }
    }

    if(space.activation_hr > hr)
      return <Inactive desc={space.description} activation_hr={space.activation_hr}/>

    switch(space.description) {
      case 'EMPTY':
        if(this.props.warehouses[space.space_id])
          return <Warehouse />;
        else if(this.props.opponentWarehouses[space.space_id])
          return <center><h3>Opponent Warehouse</h3><hr /></center>;
        else
          return <EmptySpace />;
      case 'USER FACTORY':
        return <UserFactory />;
      case 'RETAILER':
        return <Retailer />;
      default:
        return <center><h3>{space.description}</h3><hr /></center>;
    }


  },

  generateButtonId: function () {
    if(this.props.APIprogress)
      return 'skip-turn-disabled';
    return 'skip-turn';
  },

  handleClick: function () {

    if(this.props.APIprogress) {
      return false;
    }

    var submit = document.getElementById('skip-turn');
    submit.innerHTML = 'Skipping';
 
    var {user_id, auth_token, dispatch} = this.props;
    var data = {
      user_id,
      auth_token
    };
    
    var success = (data) => {
      submit.innerHTML = 'Skip Turn';
      dispatch(finishAPICall());
      
      advanceTurn({user_id, auth_token}, dispatch);
      toastr.success('Success', 'Skipped Turn Successfully');
    }

    var failure = (error) => {
      dispatch(finishAPICall());
      var msg = error.message;
      if(msg === '401') {
        initiateReset(this.props.dispatch);
        toastr.error('Invalid Credentials', 'Please Login Again');
      } else {
        submit.innerHTML = 'Skip Turn';
        toastr.error('Error', msg);
        dispatch(hideLoading());
      }
    };

    dispatch(showLoading());
    dispatch(startAPICall());
    API.request('/no_operation', data).then(success, failure);
  },

  generateFooter: function () {
    var {factory, hr} = this.props;
    var {day, hr} = convertHrtoDays(hr);
    return (
      <div id="menu-footer">
      <Row>
        <Column className="menu-detail" id={this.generateButtonId()} onClick={this.handleClick} small={5}>Skip Turn</Column>
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
      auth_token: state.userDetails.auth_token,
      APIprogress: state.progress.API,
      warehouses: state.warehouses,
      opponentWarehouses: state.opponentWarehouses
    };
  }
)(MenuElement);
