import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Img from '../assets/images/_image';



// NOT IMPLEMENTED

export default class CircleScore extends Component {

    
    constructor(props) {
        super(props);

        this.state = {
            colorSet1 : this.props.colorSet1,
            colorSet2 : this.props.colorSet2,
            colorSet3 : this.props.colorSet3,
        }
    }

    
    render() {
        return ( 
            <View style={styles.AroundScoreContainer}>
                <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet1 }]} ></View>
                <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet2 }]} ></View>
                <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet3 }]} ></View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#1abc9c',
    },
    AroundScore:{
        width: 30,
        height: 30,
        borderRadius: 150/2,
        justifyContent: 'center',
        backgroundColor: '#888888',
        marginRight: 5
    },
    AroundScoreContainer:{
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'stretch',
        marginTop: 5,
    }
});