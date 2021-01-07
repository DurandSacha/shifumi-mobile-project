import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';


export default class EndGame extends Component {


    render() {
        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    <Text style={styles.title}>Partie terminée</Text>
                </View>
                <View style={styles.content}>
                    <View style={{ marginBottom: 30 }}>
                        <Button title="Menu principal" onPress={() => this.props.navigation.navigate('Home')} color="#138a72" />
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