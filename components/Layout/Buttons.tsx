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

    /*
    navigate = () => {
        this.props.navigation.navigate(this.props.routeName);
        // TODO: integrate routes with params :  navigation.navigate('EndGame',{ result: ['victory'] });
    }
    */
    

    render() {
        let {navigation, buttonText, NameRenderView} = this.props
        return ( 
            <View style={styles.view}>
                <TouchableOpacity style={styles.MenuButtonContainer} onPress={() => navigation.push(NameRenderView)} color="#138a72">
                    <Text style={styles.MenuButtonText} >{buttonText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  
    MenuButtonText:{
        color: 'white',
        fontSize : 20,
      },
    button: {
    marginBottom: 15,
    },
    MenuButtonContainer : {
        alignItems: 'center',
        width: 210,
        backgroundColor: 'grey',
        padding: 30,
        marginTop: 20,
        borderWidth: 4,
        borderColor: "#774D3B",
      },
});