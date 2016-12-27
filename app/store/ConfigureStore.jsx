var redux = require('redux');
var thunk = require('redux-thunk').default;

import {reducer as toastrReducer} from 'react-redux-toastr';
var {UserDetailsReducer, GameDetailsReducer, MenuDetailsReducer,
     LayoutDetailsReducer, MiscReducer, FactoryReducer, WarehousesReducer,
     OpponentWarehousesReducer, DemandsReducer, EventsReducer,
     NotificationsReducer, PopularityReducer} = require('Reducers')

export var configure = (initialState = {}) => {

  var reducer = redux.combineReducers({
    userDetails: UserDetailsReducer,
    gameDetails: GameDetailsReducer,
    menuDetails: MenuDetailsReducer,
    layoutDetails: LayoutDetailsReducer,
    factory: FactoryReducer,
    warehouses: WarehousesReducer,
    opponentWarehouses: OpponentWarehousesReducer,
    demands: DemandsReducer,
    events: EventsReducer,
    notifications: NotificationsReducer,
    popularity: PopularityReducer,
    misc: MiscReducer,
    toastr: toastrReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

};
