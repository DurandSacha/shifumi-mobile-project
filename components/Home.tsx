import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Navigator, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Game from "./Game";

function goGame(){
    return ( <Game hideTabBar={true}/> );
}

export default class Home extends Component {
    
    render() {
        //this.forceUpdate();
        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Shi Fu</Text>
                        <Text style={styles.title}>Test</Text>
                    </View>

                    <View style={styles.viewButton}>
                        <Button title="Jeu solo" onPress={goGame} color="#138a72" />
                        
                        <View style={styles.viewButton}>
                            <Button title="Configuration" onPress={() => navigation.push('Configuration')} color="#138a72" />
                        </View>

                        <TouchableOpacity onPress={() => navigation.push('Configuration')} color="#138a72" >
                            <Text> Hello New Button </Text>
                        </TouchableOpacity>
                    </View>
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
    viewButton:{
        width: 80,
    },
    button: {
        marginBottom: 10,
        width: 80,
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