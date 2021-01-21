import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CardPlayed extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { icon, color, onPress, texture } = this.props;

        return ( 
            <ImageBackground style={styles.backgroundImageBois} source={texture}>
                <TouchableOpacity style={[styles.container]}> 
                    <View style={styles.rect}>
                        <Image source={icon} resizeMode="contain" style={[styles.image]} />
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImageBois :{
        marginBottom:25,
    },
    view: {
        flex: 1,
    },
    container: {
        width: 105,
        height: 140,
        //backgroundColor: 'rgba(191,44,44,1)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        width: 105,
        height: 140,
        backgroundColor: 'rgba(242,203,5,1)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container3: {
        width: 105,
        height: 140,
        backgroundColor: 'rgba(74,140,91,1)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rect: {
        width: 105,
        height: 140,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: 'rgba(255,255,255,1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:1,
      },
    image: {
        width: 70,
        height: 70,
      },
});