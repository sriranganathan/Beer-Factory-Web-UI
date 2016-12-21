var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var BeerFactory = require('BeerFactory');
var Instruction = require('Instruction');

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={BeerFactory}/>
      <Route path="instructions" component={Instruction}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
