var React = require('react');
var {connect} = require('react-redux');
var Order = require('Order');
var Upgrade = require('Upgrade');
var {Button, ButtonGroup, Link, Colors, Sizes} = require('react-foundation');

var UserFactory = React.createClass({

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

    getDisplayContent: function () {

        switch (this.state.current) {
            case 'order':
                return <Order />;
            case 'upgrade':
                return <Upgrade />;
            default:
                return <div>Coming Soon...</div>;
        }

    },

    setCurrent: function (current) {
        return () => {
            this.setState({
                current
            });
        };
    },

    render: function () {
        var {factory} = this.props
        return (
            <div>
                <center><h3>Factory</h3></center>
                <hr />
                <center>
                    <div className="button-group-basics-example">
                      <ButtonGroup size={Sizes.SMALL}>
                        <Link color={this.getColor('order')} onClick={this.setCurrent('order')}>Order</Link>
                        <Link color={this.getColor('upgrade')} onClick={this.setCurrent('upgrade')}>Upgrade</Link>
                        <Link color={this.getColor('supply')} onClick={this.setCurrent('supply')}>Supply</Link>
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

module.exports = UserFactory;