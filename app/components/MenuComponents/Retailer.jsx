var React = require('react');
var {connect} = require('react-redux');
var Demand = require('Demand');

var UserFactory = React.createClass({

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

    render: function () {
        return (
            <div>
                <center><h3>Retailer</h3></center>
                <center><h5>DEMANDS</h5></center>
                <hr />
                <div id="demands-list">
                    {this.generateDemandsList()}
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