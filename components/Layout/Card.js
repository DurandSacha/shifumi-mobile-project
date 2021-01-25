import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Card extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { icon, color, onPress, texture } = this.props;

        return ( 
            <ImageBackground style={styles.backgroundImageBois} source={texture}>
                <TouchableOpacity onPress={onPress} style={[styles.container /*, {backgroundColor : color } */]}> 
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
        //borderRadius: 100,
        width: 85,
        height: 108,
        marginRight: 5,
        marginLeft: 5,
        resizeMode: "cover",
        justifyContent: "center",
        
    },
    view: {
        flex: 1,
    },
    container: {
        width: 90,
        height: 110,
        //backgroundColor: 'rgba(191,44,44,1)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 5,
    },
    rect: {
        width: 89,
        height: 108,
        borderRadius: 0,
        //borderWidth: 1,
        //borderColor: 'rgba(255,255,255,1)',
        borderColor: 'rgba(0,00,00,1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:1,
        marginLeft: -10,
      },
    image: {
        width: 50,
        height: 50,
        borderRadius: 20,
      },
});