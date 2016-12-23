var React = require('react');
import Menu from 'react-burger-menu/lib/menus/scaleDown'
var MenuStyles = require('MenuStyles');
var {connect} = require('react-redux');
var {hideMenu} = require('Actions');

var SideBar = React.createClass({

  handleStateChange : function (state) {
      if(state.isOpen === false)
        this.props.dispatch(hideMenu());
  },

  render: function() {

    return (
      <Menu
        right
        styles={MenuStyles}
        customBurgerIcon={false}
        isOpen={this.props.isOpen}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        onStateChange={this.handleStateChange}>

        <p>We can use this for displaying details when user clicks a space</p>

      </Menu>
    );
  }

});

module.exports = connect(
  (state) => {
    return {
      isOpen : state.menuDetails.isOpen
    };
  }
)(SideBar);
