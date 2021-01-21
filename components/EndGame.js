import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Img from '../assets/images/_image';
import Buttons from './Layout/Buttons';
import 'react-native-gesture-handler';
import Parse from 'parse';

const br = `\n`;

// TODO: import score from database

export default class EndGame extends Component {

    
    constructor(props) {
        super(props);
    }

    render() {
        let { result } = this.props;
        const { navigation} = this.props;
        return (
            <View style={styles.view}>
                <ImageBackground source={Img.background} style={styles.imageBackground}>
                        <View style={styles.header}>
                            <View style={styles.TextContainer} >
                                <Text style={styles.TextBasic}>Partie terminée</Text><Text style={styles.textResult}>{result}</Text>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <Buttons buttonText="Retour Menu" navigation={navigation} NameRenderView="Home" texture={Img.bois} />
                        </View>     
                </ImageBackground>
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
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 2,
        alignItems: 'center',
        marginTop: 80,
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
    button: {
        marginBottom: 10,
    },
    MenuButtonContainer : {
        alignItems: 'center',
        width: 210,
        backgroundColor: 'grey',
        padding: 30,
        marginTop:100,
        borderWidth: 4,
        borderColor: "#774D3B",
        
      },
      MenuButtonText:{
        color: 'white',
        fontSize : 20,
      },
    TextBasic:{
        marginTop:250,
        color:'red',
        fontSize:25,
    },
    textResult:{
        color:'red',
        fontSize:50,
        fontWeight:'bold',
    }

});
