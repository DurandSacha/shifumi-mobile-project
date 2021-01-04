import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Navigator, Button, StyleSheet } from 'react-native';
import Game from "./Game";

const br = `\n`;

export default class Configuration extends Component {

    render() {
        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    <Text style={styles.title}>Configuration{br}{br}{br}</Text>
                    <Text>Son actif :  oui - non {br}</Text>
                    <Text>Nombre de manche :  1 - 2 - 3 - 4 - 5 {br}</Text>
                    <Text>Difficulté :  1 - 2 - 3 {br}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#1abc9c',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        color: '#ecf0f1',
        marginTop: 16,
    },
    content: {
        flex: 2,
    },
    button: {
        marginBottom: 10,
    },
});