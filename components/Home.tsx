import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Navigator, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Game from "./Game";

function goGame(){
    return ( <Game/> );
}

export default class Home extends Component {
    
    render() {

        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    <Text style={styles.title}>Shi Fu Mi</Text>
                </View>
                <View style={styles.content}>
                    <View style={{ marginBottom: 30 }}>
                        <Button title="Jeu solo" onPress={goGame} color="#138a72" />
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <Button title="Configuration" onPress={() => navigation.push('Configuration')} color="#138a72" />
                    </View>

                    <TouchableOpacity style={styles.container}>
                        <Text style={styles.textButton}> Other </Text>
                    </TouchableOpacity>
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
        fontSize: 80,
        color: '#ecf0f1',
        marginTop: 16,
    },
    content: {
        flex: 2,
    },
    button: {
        marginBottom: 10,
    },
    container: {
        backgroundColor: '#2175BF',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
        textButton: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
});