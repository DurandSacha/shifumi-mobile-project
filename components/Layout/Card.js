import React, { Component } from 'react';
import { View, StyleSheet, Image} from 'react-native';

export default class Card extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { icon, color } = this.props;
        return ( 
                <View style={[styles.container1, {backgroundColor : color }]}>
                    <View style={styles.rect}>
                        <Image source={icon} resizeMode="contain" style={[styles.image]} />
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    container1: {
        width: 105,
        height: 140,
        backgroundColor: 'rgba(191,44,44,1)',
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