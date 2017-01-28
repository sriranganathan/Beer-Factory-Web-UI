var API = require('API');
var {initiateReset, transformWarehouses,
      transformDemands, generateNames} = require('helpers');
var {showLoading, hideLoading, setFactory, setWarehouses,
      setOpponentWarehouses, setDemands, setEvents,
      setNotifications, setPopularity, setUserHr, removeExpiredPendingActions,
      setNames} = require('Actions');
var {toastr} = require('react-redux-toastr');

var advanceTurn = (params, dispatch) => {

    var displayNotifications = (notification, index) => {
      const options = {
        timeout: 3500 + index*500
      };
      toastr.info('Notification', notification.notif_desc, options);
    };

    var success = (data) => {
      dispatch(setUserHr(data.hr));
      dispatch(removeExpiredPendingActions(data.hr));
      dispatch(setFactory(data.factory));

      dispatch(setWarehouses(transformWarehouses(data.warehouses)));

      data.warehouses.sort((x, y) => x.active_from - y.active_from);
      var names = generateNames(data.warehouses);
      dispatch(setNames(names));

      dispatch(setOpponentWarehouses(
        transformWarehouses(data.opponent_warehouses)
      ));

      dispatch(setDemands(transformDemands(data.demands)));
      dispatch(setEvents(data.events));
      dispatch(setNotifications(data.notifications));
      dispatch(setPopularity(data.popularity));
      dispatch(hideLoading());

      data.notifications.forEach(displayNotifications);

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