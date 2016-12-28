var API = require('API');
var {initiateReset} = require('helpers');
var {showLoading, hideLoading, setFactory, setWarehouses,
      setOpponentWarehouses, setDemands, setEvents,
      setNotifications, setPopularity, setUserHr} = require('Actions');
var {toastr} = require('react-redux-toastr');

var advanceTurn = (params, dispatch) => {

    var success = (data) => {
      dispatch(setUserHr(data.hr));
      dispatch(setFactory(data.factory));
      dispatch(setWarehouses(data.warehouses));
      dispatch(setOpponentWarehouses(data.opponent_warehouses));
      dispatch(setDemands(data.demands));
      dispatch(setEvents(data.events));
      dispatch(setNotifications(data.notifications));
      dispatch(setPopularity(data.popularity));
      dispatch(hideLoading());
    };

    var failure = (error) => {
      var msg = error.message;
      if(msg === '401') {
        initiateReset(dispatch);
        toastr.error('Invalid Credentials', 'Please Login Again');
      } else {
        toastr.error('Error', msg);
      }
      dispatch(hideLoading());
    };

    dispatch(showLoading());
    API.request('/get_details', params).then(success, failure);

};

module.exports = advanceTurn;