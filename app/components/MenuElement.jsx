var React = require('react');
var {connect} = require('react-redux');

var MenuElement = React.createClass({

  render: function () {
    var {index, space} = this.props;
    if(space !== undefined) {
      return (
        <div>
          <ul>
            <li>space id - {space.space_id}</li>
            <li>Loc x - {space.loc_x}</li>
            <li>Loc y - {space.loc_y}</li>
            <li>length - {space.length}</li>
            <li>width - {space.width}</li>
            <li>Activation hr - {space.activation_hr}</li>
            <li>Description - {space.description}</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }

});

module.exports = connect(
  (state) => {
    return {
      index: state.layoutDetails.CurrentIndex,
      space: state.layoutDetails.LayoutSpaces[state.layoutDetails.CurrentIndex],
    };
  }
)(MenuElement);
