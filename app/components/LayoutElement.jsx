var React = require('react');
var {connect} = require('react-redux');
var {showMenu, setCurrentIndex} = require('Actions');

var LayoutElement = React.createClass({

  generateClass: function(space) {
    var basic_classes = "LayoutSpace";
    if (space.activation_hr <= this.props.hr) 
      return basic_classes + " LayoutSpace-active";
    else 
      return basic_classes + " LayoutSpace-locked";
  },

  generateStyle: function(space, MaxXLoc, MaxYLoc) {

    var left = (space.loc_x/MaxXLoc)*100 + "%";
    var top = (space.loc_y/MaxYLoc)*100 + "%";
    var height = (space.length/MaxYLoc)*100 + "%";
    var width = (space.width/MaxXLoc)*100 + "%";

    return {
      left,
      top,
      height,
      width
    };
  },

  generateContent: function (space) {
    if(this.props.warehouses[space.space_id])
      return 'Warehouse';
    else if(this.props.opponentWarehouses[space.space_id])
      return 'Opponent Warehouse';
    return space.description;
  },

  handleClick: function (e) {
    var {dispatch, index} = this.props;
    dispatch(setCurrentIndex(index));
    dispatch(showMenu());
  },

  render: function () {
    var {MaxXLoc, MaxYLoc, index} = this.props;
    var space = this.props.LayoutSpaces[index];
    return (
      <div className={this.generateClass(space)} onClick={this.handleClick} style={this.generateStyle(space, MaxXLoc, MaxYLoc)}>
        <p>{this.generateContent(space)}</p>
      </div>
    );
  }

});

module.exports = connect(
  (state) => {
    return {
      LayoutSpaces: state.layoutDetails.LayoutSpaces,
      MaxXLoc: state.layoutDetails.MaxXLoc,
      MaxYLoc: state.layoutDetails.MaxYLoc,
      hr: state.userDetails.hr,
      warehouses: state.warehouses,
      opponentWarehouses: state.opponentWarehouses
    };
  }
)(LayoutElement);
