import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
//import ViewOverflow from 'react-native-view-overflow';

//import Img from 'assets/images/_image';

export default class Buttons extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        let {navigation, buttonText, NameRenderView, texture} = this.props

        return ( 
            
                <ImageBackground style={styles.backgroundImageBois} source={texture}>
                    <TouchableOpacity style={styles.MenuButtonContainer} onPress={() => navigation.push(NameRenderView)} color="#138a72">
                            <Text style={styles.MenuButtonText} >{buttonText}</Text>
                    </TouchableOpacity>
                </ImageBackground>
            
            
        );
    }
}

const styles = StyleSheet.create({
    backgroundImageBois :{
        marginBottom:15,
    },
    MenuButtonText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize : 20,
      },
    button: {
    //marginBottom: 15,
    },
    MenuButtonContainer : {
        alignItems: 'center',
        width: 210,
        //backgroundColor: 'grey',
        padding: 30,
        //marginTop: 20,
        borderWidth: 4,
        borderColor: "#774D3B",
        overflow: 'hidden',
      },
});