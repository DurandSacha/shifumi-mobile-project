import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Img from '../assets/images/_image';



// props.routeName
// props.buttonText
export default class EndGame extends Component {

    
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
    imageBackground: {
        flex: 4,
        //borderWidth: -100,
        width: '100%',
        height: '100%',

    },
    header: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        color: '#ecf0f1',
        marginTop: 16,
    },
    content: {
        flex: 2,
    },
    button: {
        marginBottom: 10,
    },
    container: {
        backgroundColor: '#2175BF',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
        textButton: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
});