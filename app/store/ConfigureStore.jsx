var redux = require('redux');
var thunk = require('redux-thunk').default;

import {reducer as toastrReducer} from 'react-redux-toastr';
var {UserDetailsReducer, GameDetailsReducer, MenuDetailsReducer,
     LayoutDetailsReducer, MiscReducer, FactoryReducer, WarehousesReducer,
     OpponentWarehousesReducer, DemandsReducer, EventsReducer,
     NotificationsReducer, PopularityReducer, ProgressReducer, NamesReducer,
     SupplyProgressReducer, AssistantReducer} = require('Reducers')

export var configure = (initialState = {}) => {

  var reducer = redux.combineReducers({
    assistant: AssistantReducer,
    demands: DemandsReducer,
    events: EventsReducer,
    factory: FactoryReducer,
    gameDetails: GameDetailsReducer,
    layoutDetails: LayoutDetailsReducer,
    menuDetails: MenuDetailsReducer,
    misc: MiscReducer,
    names: NamesReducer,
    notifications: NotificationsReducer,
    opponentWarehouses: OpponentWarehousesReducer,
    popularity: PopularityReducer,
    progress: ProgressReducer,
    supplyProgress: SupplyProgressReducer,
    toastr: toastrReducer,
    userDetails: UserDetailsReducer,
    warehouses: WarehousesReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

};
