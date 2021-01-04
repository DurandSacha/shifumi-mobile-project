import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Navigator, Button, StyleSheet } from 'react-native';
import Game from "./Game";

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
        fontSize: 50,
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


export default class Configuration extends Component {

    render() {
        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    <Text style={styles.title}>Configuration</Text>
                </View>
            </View>
        );
    }
}