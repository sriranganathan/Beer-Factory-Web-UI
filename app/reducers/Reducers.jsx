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

export var GameDetailsReducer = (state = defaultGameState, action) => {
  switch (action.type) {
    case 'SET_UPGRADE_PROGRESS':
      return updateGameStorage({
        ...state,
        pendingUpgrades: action.upgrade
      });
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
