var React = require('react');
var {connect} = require('react-redux');

var Notifications = React.createClass({

    getDisplayContent: function () {

        var makeNotification = (notification, index) => {
            return <li key={index}>{notification.notif_desc}</li>;
        };

        var {notifications} = this.props;
        return notifications.map(makeNotification);
    },

    render: function () {
        return (
            <div>
                <center><h3>Notifications</h3></center>
                <hr />
                <div id="scrollable">
                    <ul className="minified-list">
                        {this.getDisplayContent()}
                    </ul>
                </div>
            </div>
        );
    }

});

module.exports = connect(
  (state) => {
    return {
      notifications: state.notifications
    };
  }
)(Notifications);