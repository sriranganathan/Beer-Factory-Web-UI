var React = require('react');
var {connect} = require('react-redux');
var {Progress, Colors, Row, Column} = require('react-foundation');

var Popularity = React.createClass({

    render: function () {
        var {current, popularity, layoutSpaces} = this.props;
        var space = layoutSpaces[current];
        var {user, opponent} = popularity[space.space_id];
        var max = (user > opponent)?user:opponent;
        var user_mod = Math.round(user/max*100);
        var opponent_mod = Math.round(opponent/max*100);

        return (
            <div className="minified">
                <Row>
                    <Column small={12}>
                        <p>You : </p>
                    </Column>
                    <Column small={12}>
                        <Progress meter={{text: Math.round(user*100) + "%"}} color={Colors.ALERT} value={user_mod}/>
                    </Column>
                </Row>
                <Row>
                    <Column small={12}>
                        <p>Opponent : </p>
                    </Column>
                    <Column small={12}>
                        <Progress meter={{text: Math.round(opponent*100) + "%"}} color={Colors.WARNING} value={opponent_mod}/>
                    </Column>
                </Row>
            </div>
        );
    }

});

module.exports = connect(
    (state) => {
        return {
            popularity: state.popularity,
            current: state.layoutDetails.CurrentIndex,
            layoutSpaces: state.layoutDetails.LayoutSpaces
        };
    }
)(Popularity);