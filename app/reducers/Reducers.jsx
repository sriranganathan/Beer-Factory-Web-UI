var user_id = localStorage.getItem('user_id');
var auth_token = localStorage.getItem('auth_token');

var UserDetails = {
  user_id,
  auth_token
};

export var UserDetailsReducer = (state = UserDetails, action) => {

  switch (action.type) {
    case 'SET_USER_CREDENTIALS':
      return {
        ...state,
        user_id: action.user_id,
        auth_token: action.auth_token
      };
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

var defaultLayoutState = {
  LayoutSpaces: [
    {
      'space_id':1,
      'loc_x':0,
      'loc_y':0,
      'width':1,
      'length':1
    },
    {
      'space_id':2,
      'loc_x':1,
      'loc_y':0,
      'width':1,
      'length':1
    },
    {
      'space_id':3,
      'loc_x':0,
      'loc_y':1,
      'width':2,
      'length':1
    }
  ],
  MaxXLoc: 0,
  MaxYLoc: 0
};

var updateMaxLocs = (state) => {

  var MaxXLoc = 0, MaxYLoc = 0;
  for(var i=0; i<state.LayoutSpaces.length; i++) {
    var cur_x = state.LayoutSpaces[i].loc_x + state.LayoutSpaces[i].width;
    var cur_y = state.LayoutSpaces[i].loc_y + state.LayoutSpaces[i].length;
    MaxXLoc = (MaxXLoc > cur_x)? MaxXLoc:cur_x;
    MaxYLoc = (MaxYLoc > cur_y)? MaxYLoc:cur_y;
  }

  return {
    ...state,
    MaxXLoc,
    MaxYLoc
  };
};


export var LayoutDetailsReducer = (state = defaultLayoutState, action) => {

  switch (action.type) {
    case 'SET_LAYOUT_SPACES':
      return updateMaxLocs({
        ...state,
        LayoutSpaces: action.LayoutSpaces
      });
    default:
      return updateMaxLocs(state);
  }

};
