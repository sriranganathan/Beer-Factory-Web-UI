var sha1 = require('js-sha1');

var user_id = localStorage.getItem('user_id');
var auth_token = localStorage.getItem('auth_token');
var hr = localStorage.getItem('hr');

var UserDetails = {
  user_id,
  auth_token,
  hr
};

var updateUserStorage = (state) => {
  if(state.user_id === null) {
    localStorage.removeItem('user_id');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('hr');
  } else {
    localStorage.setItem('user_id', state.user_id);
    localStorage.setItem('auth_token', state.auth_token);
    localStorage.setItem('hr', state.hr);
  }
  return state;
};

export var UserDetailsReducer = (state = UserDetails, action) => {

  switch (action.type) {
    case 'SET_USER_CREDENTIALS':
      return updateUserStorage({
        ...state,
        user_id: action.user_id,
        auth_token: action.auth_token
      });
    case 'SET_USER_HR':
      return updateUserStorage({
        ...state,
        hr: action.hr
      });
    default:
      return state;
  }

};

var gameDetailsStr = localStorage.getItem('gameDetails');
var gameDetailsHash = localStorage.getItem('gameDetailsHash');
var defaultGameState;

if(gameDetailsStr !== null && sha1(gameDetailsStr) === gameDetailsHash)
  defaultGameState = JSON.parse(gameDetailsStr);

if(defaultGameState === undefined)
  defaultGameState = null

var updateGameStorage = (state) => {

  var gameDetailsStr = JSON.stringify(state);
  var gameDetailsHash = sha1(gameDetailsStr);
  localStorage.setItem('gameDetails', gameDetailsStr);
  localStorage.setItem('gameDetailsHash', gameDetailsHash);

  return state;
};

var removeExpiredPendingActions = (state, hr) => {

  if(state === null || state === undefined)
    return state

  const objectWithoutKey = (object, key) => {
    key = key.toString()
    const {[key]: deletedKey, ...otherKeys} = object;
    return otherKeys;
  }

  var pendingOrders = objectWithoutKey(state.pendingOrders, hr);
  var pendingSupplies = objectWithoutKey(state.pendingSupplies, hr);
  var pendingWarehouses = objectWithoutKey(state.pendingWarehouses, hr);

  return updateGameStorage({
    ...state,
    pendingOrders,
    pendingSupplies,
    pendingWarehouses
  });

};

var addPendingOrder = (state, order) => {

  var pendingOrders = state.pendingOrders;
  var end_hr = order.end_hr;

  if(pendingOrders[end_hr] === undefined)
    pendingOrders = {
      ...pendingOrders,
      [end_hr]: [order] 
    };
  else
    pendingOrders = {
      ...pendingOrders,
      [end_hr]: [...pendingOrders[end_hr], order]
    };

  return updateGameStorage({
    ...state,
    pendingOrders
  });

};

var addPendingSupplies = (state, supplies) => {

  var pendingSupplies = state.pendingSupplies;

  for (var k in supplies) {
    var supply = supplies[k];
    var end_hr = supply.supply_end;
    if (pendingSupplies[end_hr] === undefined) {
      pendingSupplies = {
        ...pendingSupplies,
        [end_hr]: [supply]
      };
    } else {
      pendingSupplies = {
        ...pendingSupplies,
        [end_hr]: [...pendingSupplies[end_hr], supply]
      };
    }
  }

  return updateGameStorage({
    ...state,
    pendingSupplies
  });
};

export var GameDetailsReducer = (state = defaultGameState, action) => {
  switch (action.type) {
    case 'SET_UPGRADE_PROGRESS':
      return updateGameStorage({
        ...state,
        pendingUpgrades: action.upgrade
      });
    case 'REMOVE_EXPIRED_PENDING_ACTIONS':
      return removeExpiredPendingActions(state, action.current_hr);
    case 'ADD_PENDING_ORDER':
      return addPendingOrder(state, action.order);
    case 'ADD_PENDING_SUPPLIES':
      return addPendingSupplies(state, action.supplies);
    case 'SET_GAME_STATE':
      var {type, ...rest} = action;
      return updateGameStorage({
        ...state,
        ...rest
      });
    default:
      return state;
  }

};

var defaultMenuState = {
  isOpen: false
};

export var MenuDetailsReducer = (state = defaultMenuState, action) => {

  switch (action.type) {
    case 'SHOW_MENU':
      return {
        ...state,
        isOpen: true
      };
    case 'HIDE_MENU':
      return {
        ...state,
        isOpen: false
      };
      default:
        return state;
  }

};


var layoutDetailsStr = localStorage.getItem('layoutDetails');
var layoutDetailsHash = localStorage.getItem('layoutDetailsHash');
var defaultLayoutState;

if(layoutDetailsStr !== null && sha1(layoutDetailsStr) === layoutDetailsHash)
  defaultLayoutState = JSON.parse(layoutDetailsStr);

if(defaultLayoutState === undefined)
  defaultLayoutState = {
    LayoutSpaces: [],
    MaxXLoc: 0,
    MaxYLoc: 0,
    CurrentIndex: null
  };


var updateLayoutStorage = (state) => {

  if(state.LayoutSpaces.length === 0) {
    localStorage.removeItem('layoutDetails');
    localStorage.removeItem('layoutDetailsHash');
  } else {
    var layoutDetailsStr = JSON.stringify(state);
    var layoutDetailsHash = sha1(layoutDetailsStr);
    localStorage.setItem('layoutDetails', layoutDetailsStr);
    localStorage.setItem('layoutDetailsHash', layoutDetailsHash);
  }

  return state;

};


var updateMaxLocs = (state) => {

  var MaxXLoc = 0, MaxYLoc = 0;
  for(var i=0; i<state.LayoutSpaces.length; i++) {
    var cur_x = state.LayoutSpaces[i].loc_x + state.LayoutSpaces[i].width;
    var cur_y = state.LayoutSpaces[i].loc_y + state.LayoutSpaces[i].length;
    MaxXLoc = (MaxXLoc > cur_x)? MaxXLoc:cur_x;
    MaxYLoc = (MaxYLoc > cur_y)? MaxYLoc:cur_y;
  }

  var result = {
    ...state,
    MaxXLoc,
    MaxYLoc
  };

  return updateLayoutStorage(result);

};


export var LayoutDetailsReducer = (state = defaultLayoutState, action) => {

  switch (action.type) {
    case 'SET_LAYOUT_SPACES':
      return updateMaxLocs({
        ...state,
        LayoutSpaces: action.LayoutSpaces
      });
    case 'SET_CURRENT_INDEX':
      return updateLayoutStorage({
        ...state,
        CurrentIndex: action.CurrentIndex
      });
    default:
      return state;
  }

};

var defaultMiscState = {
  isLoading: true
};

export var MiscReducer = (state = defaultMiscState, action) => {

  switch (action.type) {
    case 'SHOW_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'HIDE_LOADING':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }

};

export var FactoryReducer = (state = {}, action) => {

  switch (action.type) {
    case 'SET_FACTORY':
      var {type, ...rest} = action;
      return {
        ...state,
        ...rest
      };
    default:
      return state;
  }

};

export var WarehousesReducer = (state = {}, action) => {

  switch (action.type) {
    case 'SET_WAREHOUSES':
      return action.warehouses;
    default:
      return state;
  }

};

export var OpponentWarehousesReducer = (state = {}, action) => {

  switch (action.type) {
    case 'SET_OPPONENT_WAREHOUSES':
      return action.warehouses;
    default:
      return state;
  }

};

export var DemandsReducer = (state = {}, action) => {

  switch (action.type) {
    case 'SET_DEMANDS':
      return action.demands;
    default:
      return state;
  }

};

export var EventsReducer = (state = [], action) => {

  switch (action.type) {
    case 'SET_EVENTS':
      return action.events;
    default:
      return state;
  }

};

export var PopularityReducer = (state = {}, action) => {

  switch (action.type) {
    case 'SET_POPULARITY':
      return action.popularity
    default:
      return state
  }

};

export var NotificationsReducer = (state = [], action) => {

  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return action.notifications
    default:
      return state
  }

};

var defaultProgressState = {
  API: false
};

export var ProgressReducer = (state = defaultProgressState, action) => {

  switch (action.type) {
    case 'SET_API_PROGRESS':
      return {
        ...state,
        API: true
      };
    case 'RESET_API_PROGRESS':
      return {
        ...state,
        API: false
      };
    default:
      return state
  }

};

export var NamesReducer = (state = {}, action) => {

  switch (action.type) {
    case 'SET_NAMES':
      return {
        ...state,
        ...action.names
      };
    default:
      return state
  }

};

export var SupplyProgressReducer = (state = [], action) => {

  switch (action.type) {
    case 'SET_SUPPLY_PROGRESS':
      return action.supply;
    default:
      return state;
  }

};
