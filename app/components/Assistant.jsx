var React = require('react');
var {connect} = require('react-redux');
var {showAssistant, hideAssistant, prevAssistant, nextAssistant} = require('Actions');

var Assistant = React.createClass({

    generateContent: function () {
        var {assistant} = this.props;
        return assistant.messages[assistant.current];
    },

    handleClick: function (type) {

        var {dispatch} = this.props;

        return () => {
            if(type==="prev")
                dispatch(prevAssistant());
            else if(type==="next")
                dispatch(nextAssistant());
            else
                dispatch(hideAssistant());
        };

    },

    generateCloseButton: function () {
        var {assistant} = this.props;
        if (assistant.messages.length === assistant.current+1)
            return (<button className="newer" onClick={this.handleClick('close')}>close</button>);
        else
            return false;
    },

    render: function () {
        return (
          <div className="container">
            <div id="bub">
            <div className="example-obtuse">
                <div className="main">
                {this.generateContent()}
                </div>
                <center>
                <button className="older" style={{marginRight: '30px'}} onClick={this.handleClick('prev')}>prev</button>
                <button className="newer" style={{marginRight: '30px'}} onClick={this.handleClick('next')}>next</button>
                {this.generateCloseButton()}
                </center>
            </div>
            </div>
            <div id="movable" style={{zIndex:1000, width:'10%', position:'fixed', bottom:'-140px', right:'1%', marginRight:'1%', right:'100px'}}>
            <img src="../images/genius.svg" width="150px" />
            </div>
          </div>
        );
    }
});

module.exports = connect(
    (state) => {
        return {
            assistant: state.assistant
        };
    }
)(Assistant);