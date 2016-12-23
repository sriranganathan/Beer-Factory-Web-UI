var React = require('react');
var {connect} = require('react-redux');

var LayoutElement = React.createClass({

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

  render: function () {
    var {MaxXLoc, MaxYLoc, index} = this.props;
    var space = this.props.LayoutSpaces[index];
    return (
      <div className="LayoutSpace" style={this.generateStyle(space, MaxXLoc, MaxYLoc)}>
        <p>This space was generated for {JSON.stringify(space)}</p>
      </div>
    );
  }

});

module.exports = connect(
  (state) => {
    return {
      LayoutSpaces: state.layoutDetails.LayoutSpaces,
      MaxXLoc: state.layoutDetails.MaxXLoc,
      MaxYLoc: state.layoutDetails.MaxYLoc
    };
  }
)(LayoutElement);
