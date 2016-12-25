export var setUserCredentials = (user_id, auth_token) => {
  return {
    type: "SET_USER_CREDENTIALS",
    user_id,
    auth_token
  };
};

export var showMenu = () => {
  return {
      type: "SHOW_MENU",
    };
};

export var hideMenu = () => {
  return {
      type: "HIDE_MENU",
    };
};

export var setLayoutSpace = (LayoutSpaces) => {
  return {
    type: 'SET_LAYOUT_SPACES',
    LayoutSpaces: LayoutSpaces
  };
}

export var setCurrentIndex = (CurrentIndex) => {
  return {
    type: 'SET_CURRENT_INDEX',
    CurrentIndex
  };
}
