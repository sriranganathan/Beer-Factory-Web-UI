var React = require('react');
var {connect} = require('react-redux');
var Advertisement = require('Advertisement');

var Advertise = React.createClass({

    getInitialState: function () {
        return {
            ad: null
        };
    },

    handleChange: function () {
        var ad = Math.floor(this.refs.adList.value);
        this.setState({
            ad
        });
    },

    generateAdList: function () {
        var {advertisements} = this.props;
        var generateAd = (ad, index) => {
            return (
                <option value={index} key={index}>
                    {ad.advertisement_desc}
                </option>
            );
        };

        return advertisements.map(generateAd);
    },

    displayAd: function () {
        var {ad} = this.state;       

        if(ad === null) 
            return <p>Select An Ad from the list</p>;
        console.log(ad);
        return <Advertisement index={ad} />;
    },

    render: function () {
        return (
            <div className="minified">
                <select onChange={this.handleChange} ref="adList">
                    <option value="" disabled selected>Select an Ad</option>
                    {this.generateAdList()}
                </select>
                <br />
                {this.displayAd()}
            </div>
        );
    }

});

module.exports = connect(
    (state) => {
        return {
            advertisements: state.gameDetails.advertisements,
        };
    }
)(Advertise);