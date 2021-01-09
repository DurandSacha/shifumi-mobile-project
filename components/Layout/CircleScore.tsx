import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Img from '../assets/images/_image';



// NOT IMPLEMENTED

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
        width: 30,
        height: 30,
        borderRadius: 150/2,
        justifyContent: 'center',
        backgroundColor: '#888888',
        marginRight: 0,
    },
    AroundScoreContainer:{
        flex: 0, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'stretch',
        marginTop: 5,
    }
});