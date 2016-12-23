var React = require('react');
var {connect} = require('react-redux');
var LayoutElement = require('LayoutElement');

var LayoutList = React.createClass({

  generateElement: function(element, index) {
    return <LayoutElement key={index} index={index}/>
  },

  generateList: function() {
    var {LayoutSpaces} = this.props;
    return LayoutSpaces.map(this.generateElement);

  },

  render: function () {
    return (
      <div>
        {this.generateList()}
      </div>
    );
  }

});

module.exports = connect(
  (state) => {
    return {
      LayoutSpaces: state.layoutDetails.LayoutSpaces
    };
  }
)(LayoutList);
