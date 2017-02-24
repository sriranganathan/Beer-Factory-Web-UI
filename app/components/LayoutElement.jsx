var React = require('react');
var {connect} = require('react-redux');
var {showMenu, setCurrentIndex} = require('Actions');
var {Badge, Colors} = require('react-foundation');

var LayoutElement = React.createClass({

  generateClass: function(space) {

    if(space.description === 'ROAD')
      return 'Road';

    var basic_classes = "LayoutSpace";

    if (space.description === 'EMPTY' && !this.props.warehouses[space.space_id] && !this.props.opponentWarehouses[space.space_id]) {
      basic_classes += " EMPTY";
      if (space.activation_hr > this.props.hr)
        basic_classes += "-LOCKED";
    }

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

  createContentBlock: function (space) {
    if(space.description !== 'ROAD') {

      var getImageLoc = (desc) => {
        var baseLoc = "../images/";
        switch (desc) {
          case 'USER FACTORY':
            return baseLoc + 'factory.png';
          case 'RETAILER':
            var i = Math.floor((Math.random() * 2) + 1);
            return baseLoc + 'retailer' + i + '.png';
          case 'OPPONENT FACTORY':
            return baseLoc + 'opponent.png';
          case 'WAREHOUSE':
            return baseLoc + 'warehouse.png';
          default:
            return '';
        }
      }

      var generateImage = (space) => {
        var images = ['USER FACTORY', 'RETAILER', 'OPPONENT FACTORY'];
        if (images.includes(space.description))
          return <img className="layout-space-img" src={getImageLoc(space.description)} />;

        var {warehouses} = this.props;
        for (var k in warehouses) {
          if (warehouses[k].space__space_id === space.space_id) {
            return <img className="layout-space-img" src={getImageLoc('WAREHOUSE')} />;
          }
        }

        return false;
      }

      return (
        <div className="layout-content container">
          {generateImage(space)}
          {this.generateBadge(space)}
        </div>
      );
    }
  },

  generateContent: function (space) {

    return '';

    if(space.description === 'ROAD')
      return '';

    if(space.description === 'EMPTY') {
      if(this.props.warehouses[space.space_id])
        return 'Warehouse';
      else if(this.props.opponentWarehouses[space.space_id])
        return 'Opponent Warehouse';
      else
        return 'EMPTY';
    }

    return space.description;
  },

  generateBadge: function (space) {

    var name = this.props.names[space.space_id]
    if(space.description === 'RETAILER')
      return (
        <div className="BadgeContainer">
          <Badge>
            {name}
          </Badge>
        </div>
      );

    if(name)
      return (
        <div className="BadgeContainer">
          <Badge color={Colors.ALERT}>
            {name}
          </Badge>
        </div>
      );
  },

  handleClick: function (e) {
    var {dispatch, index} = this.props;
    var space = this.props.LayoutSpaces[index];

    if(space.description === 'ROAD')
      return false

    dispatch(setCurrentIndex(index));
    dispatch(showMenu());
  },

  render: function () {
    var {MaxXLoc, MaxYLoc, index} = this.props;
    var space = this.props.LayoutSpaces[index];
    return (
      <div className={this.generateClass(space)} onClick={this.handleClick} style={this.generateStyle(space, MaxXLoc, MaxYLoc)}>
        {this.createContentBlock(space)}
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
      opponentWarehouses: state.opponentWarehouses,
      names: state.names
    };
  }
)(LayoutElement);
