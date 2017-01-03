var React = require('react');
import ReduxToastr from 'react-redux-toastr'

var Toastr = React.createClass({
  render : function () {
    return (
      <ReduxToastr
        id="toastr"
        timeOut={4000}
        newestOnTop={true}
        preventDuplicates={true}
        position="top-right"
        transitionIn="bounceIn"
        transitionOut="fadeOut"
        progressBar/>
    );
  }
});

module.exports = Toastr;
