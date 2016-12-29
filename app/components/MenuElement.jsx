var React = require('react');
var {connect} = require('react-redux');
var UserFactory = require('UserFactory');
var Retailer = require('Retailer');
var {Row} = require('react-foundation');

var MenuElement = React.createClass({

  generateContent: function() {

    var {index, space} = this.props;
    
    if (space === undefined)
      return false;

    switch(space.description) {
      case 'USER FACTORY':
        return <UserFactory />;
      case 'RETAILER':
        return <Retailer />;
      default:
        return <center><h3>{space.description}</h3></center>;
    }


  },

  generateFooter: function () {
    var {factory, hr} = this.props;
    return (
      <div id="menu-footer">
        <Row>Available Money - ₹ {factory.money}</Row>
        <Row>Score - {factory.user_score}</Row>
        <Row>Day - {Math.floor(hr/25) + 1}, Hr - {hr%25}</Row>
      </div>
    );
  },

  render: function () {

    return (
      <div className="container menu-container">
        <div className="container menu-element-container">
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
      hr: state.userDetails.hr
    };
  }
)(MenuElement);
