var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('Router')
var {Provider} = require('react-redux');

// App css
require('style!css!sass!applicationStyles')

var store = require('configureStore').configure();

ReactDOM.render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('app')
);
