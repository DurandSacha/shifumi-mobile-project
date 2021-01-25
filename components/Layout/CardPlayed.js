import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CardPlayed extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { icon, color, onPress, texture } = this.props;

        return ( 
                <TouchableOpacity style={[styles.container]}> 
                    <ImageBackground style={styles.backgroundImageBois} source={texture}>
                        <View style={styles.rect}>
                            <Image source={icon} resizeMode="contain" style={[styles.image]} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImageBois :{ // image background
        marginBottom:25,
        padding: 0,
        margin: 0,
        width: 110,
        height: 90,
        borderRadius: 10,
        //width: widthPercentageToDP('40%'),
        //height : heightPercentageToDP('20%')
    },
    view: {
        flex: 1,
    },
    container: {   //Touchable opcacity
        width: 120,
        height: 90,
        //backgroundColor: 'rgba(191,44,44,1)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        marginBottom: 15,
        borderRadius: 10,
        resizeMode: 'cover',
        
        //width: widthPercentageToDP('40%'),
        //height : heightPercentageToDP('20%'),
    },
    rect: {
        width: 110,
        height: 77,
        //borderRadius: 10,
        borderWidth: 1,
        //borderColor: 'rgba(50,50,50,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:13,

      },
    image: {
        width: 70,
        height: 70,
      },
});