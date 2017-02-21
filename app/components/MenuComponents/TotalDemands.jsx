var React = require('react');
var {connect} = require('react-redux');
var Demand = require('Demand');

var TotalDemands = React.createClass({

    generateDemand: function (demand, index) {
        demand = {
            ...demand,
            name: 'RETAILER ' + this.props.names[demand.space_id]
        };

        return <Demand demand={demand} key={demand.space_id + '$' + index} />;
    },

    generateDemandsList: function () {
        var demands = this.props.demands;

        if(demands === undefined || demands.length === 0)
            return <div>No current Demands</div>

        var result = [];

        for(var k in demands) {
            result = result.concat(demands[k].map(this.generateDemand))
        }

        return result;
    },

    render: function () {
        return (
            <div>
                <center><h3>Demands</h3></center>
                <hr />
                <div id="scrollable" className="minified">
                    {this.generateDemandsList()}
                </div>
            </div>
        );
    }

});

module.exports = connect(
  (state) => {
    return {
        demands: state.demands,        
        names: state.names
    };
  }
)(TotalDemands);