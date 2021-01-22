import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class CircleScore extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let { colorSet1, colorSet2, colorSet3 } = this.props;

        return ( 
            <View>
                <View style={styles.AroundScoreContainer}>
                    <View style={[ styles.AroundScore,{ backgroundColor: colorSet1 }]} ></View>
                    <View style={[ styles.AroundScore,{ backgroundColor: colorSet2 }]} ></View>
                    <View style={[ styles.AroundScore,{ backgroundColor: colorSet3 }]} ></View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 0,
        backgroundColor: '#1abc9c',
    },
    AroundScore:{
        width: 90,
        height: 30,
        //borderRadius: 150/2,
        justifyContent: 'center',
        backgroundColor: 'rgba(40,40,70,1)',
        marginRight: 5,
        marginLeft: 5,
        borderWidth: 0,
        //borderColor: 'rgba(255,255,255,1)',
        borderColor: 'rgba(70,70,70,1)',
    },
    AroundScoreContainer:{
        flex: 0, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'stretch',
        marginTop: 5,
    }
});