var redux = require('redux');
var thunk = require('redux-thunk').default;

var {UserDetailsReducer, GameDetailsReducer} = require('Reducers')

export var configure = (initialState = {}) => {

  var reducer = redux.combineReducers({
    userDetails: UserDetailsReducer,
    gameDetails: GameDetailsReducer,
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

};
