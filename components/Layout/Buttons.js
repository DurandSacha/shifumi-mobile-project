import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Buttons extends Component {

    constructor(props) {
        super(props);
    }

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