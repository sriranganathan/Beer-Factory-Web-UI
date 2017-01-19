var redux = require('redux');
var thunk = require('redux-thunk').default;

import {reducer as toastrReducer} from 'react-redux-toastr';
var {UserDetailsReducer, GameDetailsReducer, MenuDetailsReducer,
     LayoutDetailsReducer, MiscReducer, FactoryReducer, WarehousesReducer,
     OpponentWarehousesReducer, DemandsReducer, EventsReducer,
     NotificationsReducer, PopularityReducer, ProgressReducer, NamesReducer} =
     require('Reducers')

export var configure = (initialState = {}) => {

  var reducer = redux.combineReducers({
    demands: DemandsReducer,
    events: EventsReducer,
    factory: FactoryReducer,
    gameDetails: GameDetailsReducer,
    layoutDetails: LayoutDetailsReducer,
    menuDetails: MenuDetailsReducer,
    misc: MiscReducer,
    notifications: NotificationsReducer,
    opponentWarehouses: OpponentWarehousesReducer,
    popularity: PopularityReducer,
    progress: ProgressReducer,
    toastr: toastrReducer,
    userDetails: UserDetailsReducer,
    warehouses: WarehousesReducer,
    names: NamesReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

};
