export var setUserCredentials = (user_id, auth_token) => {
  return {
    type: "SET_USER_CREDENTIALS",
    user_id,
    auth_token
  };
};

export var setUserHr = (hr) => {
  return {
    type: "SET_USER_HR",
    hr
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
};

export var setCurrentIndex = (CurrentIndex) => {
  return {
    type: 'SET_CURRENT_INDEX',
    CurrentIndex
  };
};

export var setGameState = (gameState) => {
  return {
    type: 'SET_GAME_STATE',
    ...gameState
  };
};

export var showLoading = () => {
  return {
    type: 'SHOW_LOADING',
  };
};

export var hideLoading = () => {
  return {
    type: 'HIDE_LOADING',
  };
};

export var setFactory = (factory) => {
  return {
    type: 'SET_FACTORY',
    ...factory
  }
};

export var setWarehouses = (warehouses) => {
  return {
    type: 'SET_WAREHOUSES',
    warehouses
  }
};

export var setOpponentWarehouses = (warehouses) => {
  return {
    type: 'SET_OPPONENT_WAREHOUSES',
    warehouses
  }
};

export var setDemands = (demands) => {
  return {
    type: 'SET_DEMANDS',
    demands
  }
};

export var setEvents = (events) => {
  return {
    type: 'SET_EVENTS',
    events
  }
};

export var setNotifications = (notifications) => {
  return {
    type: 'SET_NOTIFICATIONS',
    notifications
  }
};

export var setPopularity = (popularity) => {
  return {
    type: 'SET_POPULARITY',
    popularity
  }
};