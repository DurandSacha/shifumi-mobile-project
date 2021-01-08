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
        return ( 
            <View style={styles.view}>
                
            </View>
        );
    }
}
/*
<View style={styles.AroundScoreContainer}>
    <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet1 }]} ></View>
    <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet2 }]} ></View>
    <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet3 }]} ></View>
</View>

*/
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#1abc9c',
    },
});