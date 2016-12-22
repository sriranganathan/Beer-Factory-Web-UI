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
