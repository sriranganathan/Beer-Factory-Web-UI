var React = require('react');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var BeerFactory = require('BeerFactory');
var Instruction = require('Instruction');

var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={BeerFactory}/>
      <Route path="instructions" component={Instruction}/>
    </Route>
  </Router>
);

module.exports = Router;
