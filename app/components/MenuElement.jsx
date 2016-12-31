var React = require('react');
var {connect} = require('react-redux');
var UserFactory = require('UserFactory');
var Retailer = require('Retailer');
var {Row, Column, Icon} = require('react-foundation');
var Inactive = require('Inactive');
var {convertHrtoDays} = require('helpers');

var MenuElement = React.createClass({

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

  generateFooter: function () {
    var {factory, hr} = this.props;
    var {day, hr} = convertHrtoDays(hr);
    return (
      <div id="menu-footer">
      <Row>
        <Column className="menu-detail" small={12}>Day {day}, hr {hr}</Column>
        <Column className="menu-detail" small={5}>₹ {factory.money}</Column>
        <Column className="menu-detail" small={7}>Score - {factory.user_score}</Column>
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
      hr: state.userDetails.hr
    };
  }
)(MenuElement);
