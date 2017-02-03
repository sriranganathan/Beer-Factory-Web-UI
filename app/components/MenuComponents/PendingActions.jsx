var React = require('react');
var {connect} = require('react-redux');
var {Button, ButtonGroup, Link, Colors, Sizes} = require('react-foundation');
var {convertHrtoDays} = require('helpers');

var Notifications = React.createClass({

    getInitialState: function () {
        return {
            current: 'order'
        };
    },

    getColor: function (value) {
        if(value === this.state.current)
            return Colors.ALERT
        return Colors.PRIMARY
    },

    setCurrent: function (current) {
        return () => {
            this.setState({
                current
            });
        };
    },

    getDisplayContent: function () {
        var {current} = this.state;
        if (current === 'upgrade') {
            var {pendingUpgrade, hr} = this.props;
            if (pendingUpgrade === null || pendingUpgrade <= hr) {
                return (
                    <center>
                        <p>No Upgradation in Progress</p>
                    </center>
                );
            } else {
                var {factory, upgrades} = this.props;
                var upgrade = upgrades[factory.level + 1];
                var {day, hr} = convertHrtoDays(pendingUpgrade);
                return (
                    <div className="minified">
                        <p>Current Capacity : {factory.capacity}</p>
                        <p>Upgraded Capacity : {upgrade.capacity}</p>
                        <p>Completion : Day {day}, Hr {hr}</p>
                    </div>
                );
            }
        } else {
            return current;
        }
    },

    render: function () {
        return (
            <div>
                <center><h4>Pending Actions</h4></center>
                <hr />
                <center>
                    <div className="button-group-basics-example">
                      <ButtonGroup size={Sizes.TINY}>
                        <Link color={this.getColor('order')} onClick={this.setCurrent('order')}>Orders</Link>
                        <Link color={this.getColor('upgrade')} onClick={this.setCurrent('upgrade')}>Upgrades</Link>
                        <Link color={this.getColor('supply')} onClick={this.setCurrent('supply')}>Supplies</Link>
                      </ButtonGroup>
                    </div>
                </center>
                <div id="scrollable">
                    {this.getDisplayContent()}
                </div>
            </div>
        );
    }

});

module.exports = connect(
  (state) => {
    return {
        hr: state.userDetails.hr,
        supply: state.gameDetails.pendingOrders,
        order: state.gameDetails.pendingSupplies,
        pendingUpgrade: state.gameDetails.pendingUpgrades,
        factory: state.factory,
        upgrades: state.gameDetails.upgrades,
    };
  }
)(Notifications);