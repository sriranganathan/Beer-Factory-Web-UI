export var setUserCredentials = (user_id, auth_token) => {
  return {
    type: "SET_USER_CREDENTIALS",
    user_id,
    auth_token
  };
};
