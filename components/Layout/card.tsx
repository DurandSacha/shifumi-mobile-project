import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Img from '../assets/images/_image';

// NOT IMPLEMENTED

export default class Card extends Component {

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
<View style={styles.container1}>
    <View style={styles.rect}>
    <TouchableOpacity onPress={() => this.MakeSet("ciseau")}>
        <Image source={Img.ciseau} resizeMode="contain" style={styles.image1} />
    </TouchableOpacity>
    </View>
</View>
*/

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#1abc9c',
    },
});