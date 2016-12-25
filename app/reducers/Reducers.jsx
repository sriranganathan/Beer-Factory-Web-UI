var sha1 = require('js-sha1');

var user_id = localStorage.getItem('user_id');
var auth_token = localStorage.getItem('auth_token');

var UserDetails = {
  user_id,
  auth_token
};

var updateUserStorage = (state) => {
  if(state.user_id === null) {
    console.login
    localStorage.removeItem('user_id');
    localStorage.removeItem('auth_token');
  } else {
    localStorage.setItem('user_id', state.user_id);
    localStorage.setItem('auth_token', state.auth_token);
  }
};

export var UserDetailsReducer = (state = UserDetails, action) => {

  switch (action.type) {
    case 'SET_USER_CREDENTIALS':
      var result = {
        ...state,
        user_id: action.user_id,
        auth_token: action.auth_token
      };
      updateUserStorage(result);
      return result;
    default:
      return state;
  }

};

export var GameDetailsReducer = (state = {}, action) => {

  switch (action.type) {
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


var layoutDetailsStr = localStorage.getItem(user_id + '_layoutDetails');
var layoutDetailsHash = localStorage.getItem(user_id + '_layoutDetailsHash');
var defaultLayoutState;

if(layoutDetailsStr !== null && sha1(layoutDetailsStr) === layoutDetailsHash)
  defaultLayoutState = JSON.parse(layoutDetailsStr);

if(defaultLayoutState === undefined)
  defaultLayoutState = {
    LayoutSpaces: [],
    MaxXLoc: 0,
    MaxYLoc: 0
  };


var updateLayoutStorage = (state) => {
  var layoutDetailsStr = JSON.stringify(state);
  var layoutDetailsHash = sha1(layoutDetailsStr);
  localStorage.setItem(user_id + '_layoutDetails', layoutDetailsStr);
  localStorage.setItem(user_id + '_layoutDetailsHash', layoutDetailsHash);
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

  updateLayoutStorage(result);
  return result;

};


export var LayoutDetailsReducer = (state = defaultLayoutState, action) => {

  switch (action.type) {
    case 'SET_LAYOUT_SPACES':
      return updateMaxLocs({
        ...state,
        LayoutSpaces: action.LayoutSpaces
      });
    default:
      return state;
  }

};
