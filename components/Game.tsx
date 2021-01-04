import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#1abc9c',
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    boardContainer: {
        flex: 4,
    },
    scoreContainer: {
        flex: 2,
    },
    scoreColorTwo: {
        backgroundColor: '#34495e',
    },
    scoreColorOne: {
        backgroundColor: '#9b59b6',
    },
});

export default class Game extends Component {

    /*
    constructor(props) {
        super(props);

        this.state = {
            game: this.getGameModel(),
            canPlay: true,
        };
    }
    */

   
        //const { game, canPlay } = this.state;
        //const highlightPlayerOne = (game.currentIndexPlayer === 0);
    render(){
        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    <Text> Game </Text>
                </View>
            </View>
        );
    }
    
}