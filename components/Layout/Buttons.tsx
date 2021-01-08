import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Img from '../assets/images/_image';


// NOT IMPLEMENTED

// props.routeName
// props.buttonText
export default class Buttons extends Component {

    
    constructor(props) {
        super(props);
    }

    navigate = () => {
        this.props.navigation.navigate(this.props.routeName);
        // TODO: integrate routes with params :  navigation.navigate('EndGame',{ result: ['victory'] });
    }
    

    render() {
        return ( 
            <View style={styles.view}>
                <TouchableOpacity onPress={this.navigate()}>
                    <Text>Button</Text>
                    <Text>{this.props.buttonText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#1abc9c',
    },
});