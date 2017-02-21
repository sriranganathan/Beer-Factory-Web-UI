var React = require('react');
var {connect} = require('react-redux');
var {Button, ButtonGroup, Link, Colors, Sizes} = require('react-foundation');
var {convertHrtoDays} = require('helpers');
var PendingOrderElement = require('PendingOrderElement');
var PendingSupplyElement = require('PendingSupplyElement');

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

    generatePendingOrderElement: function (element, index) {
        return <PendingOrderElement
                key={index}
                start={element.start_hr}
                end={element.end_hr}
                qty={element.qty} />;
    },

    generateName: function (space_id) {
        var elem_name = this.props.names[space_id];
        var elem_suffix = "Retailer ";

        if(Math.floor(elem_name))
            elem_suffix = "Warehouse ";

        return elem_suffix + elem_name;
    },

    generatePendingSupplyElement: function (element, index) {
        return <PendingSupplyElement
                key={index} 
                end={element.supply_end}
                qty={element.supply_qty}
                source={this.generateName(element.source_space)}
                dest={this.generateName(element.dest_space)}
                />
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
        } else if (current === 'order') {
            var {pendingOrders} = this.props;
            if(Object.keys(pendingOrders).length === 0)
                return (
                    <center>
                        <p>No Pending Orders</p>
                    </center>
                );

            var result = [], index=0;
            for(var k in pendingOrders) {
                var cur = pendingOrders[k];
                for(var i in cur) {
                    result.push(this.generatePendingOrderElement(cur[i], index));
                    index++;
                }
            }

            return result;
        } else {
            var {pendingSupplies} = this.props;
            if(Object.keys(pendingSupplies).length === 0)
                return (
                    <center>
                        <p>No Pending Supplies</p>
                    </center>
                );

            var result = [], index=0;
            for(var k in pendingSupplies) {
                var cur = pendingSupplies[k];
                for(var i in cur) {
                    result.push(this.generatePendingSupplyElement(cur[i], index));
                    index++;
                }
            }

            return result;            
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
                <div id="scrollable" className="minified">
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
        pendingOrders: state.gameDetails.pendingOrders,
        pendingSupplies: state.gameDetails.pendingSupplies,
        names: state.names
    };
  }
)(Notifications);