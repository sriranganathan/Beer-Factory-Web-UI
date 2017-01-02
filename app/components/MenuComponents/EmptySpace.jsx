var React = require('react');
var {Button, ButtonGroup, Link, Colors, Sizes} = require('react-foundation');

var EmptySpace = React.createClass({

    getInitialState: function () {
        return {
            current: 'advt'
        };
    },

    getColor: function (value) {
        if(value === this.state.current)
            return Colors.ALERT
        return Colors.PRIMARY
    },

    getDisplayContent: function () {

        switch (this.state.current) {
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
        return (
            <div>
                <center><h3>Empty Space</h3></center>
                <hr />
                <center>
                    <div className="button-group-basics-example">
                      <ButtonGroup size={Sizes.TINY}>
                        <Link color={this.getColor('advt')} onClick={this.setCurrent('advt')}>Advertise</Link>
                        <Link color={this.getColor('build')} onClick={this.setCurrent('build')}>Build Warehouse</Link>
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

module.exports = EmptySpace;