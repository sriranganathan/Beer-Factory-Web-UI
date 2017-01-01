var React = require('react');
var {connect} = require('react-redux');
var Demand = require('Demand');
var {Button, ButtonGroup, Link, Colors, Sizes} = require('react-foundation');
var Popularity = require('Popularity');

var UserFactory = React.createClass({

    getInitialState: function () {
        return {
            current: 'demand'
        };
    },

    generateDemand: function (demand, index) {
        return <Demand demand={demand} key={index} />;
    },

    generateDemandsList: function () {
        var demands = this.props.demands[this.props.space.space_id];

        if(demands === undefined || demands.length === 0)
            return <div>No current Demands</div>

        var result = demands.map(this.generateDemand);
        return result;
    },

    getDisplayContent: function () {
        var {current} = this.state;
        switch (current) {
            case 'demand':
                return this.generateDemandsList();
            case 'popularity':
                return <Popularity />
            default:
                return 'Coming Soon...'
        }
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

    render: function () {
        return (
            <div>
                <center><h3>Retailer</h3></center>
                <hr />
                <center>
                    <div className="button-group-basics-example">
                      <ButtonGroup size={Sizes.TINY}>
                        <Link color={this.getColor('demand')} onClick={this.setCurrent('demand')}>Demands</Link>
                        <Link color={this.getColor('popularity')} onClick={this.setCurrent('popularity')}>Popularity</Link>
                        <Link color={this.getColor('history')} onClick={this.setCurrent('history')}>History</Link>
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
            space: state.layoutDetails.LayoutSpaces[
                state.layoutDetails.CurrentIndex],
            demands: state.demands
        };
    }
)(UserFactory);