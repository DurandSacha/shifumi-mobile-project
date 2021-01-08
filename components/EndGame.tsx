import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Img from '../assets/images/_image';
import MenuButton from './MenuButton';
import 'react-native-gesture-handler';

const br = `\n`;

export default class EndGame extends Component {

    
    constructor(props) {
        super(props);

        this.state = {
            resultGame : ''
        }

        this.navigation = this.props.navigation;
    }

    componentDidMount = () => {
        if (this.props.result == 'victory'){
             this.setState({resultGame: 'Victoire'})
        }
        else { this.setState({resultGame: 'Défaite'}) }
    }
    

    render() {
        //this.displayingWhoIsWinner;
        const { resultGame } = this.state;
        return (
            <View style={styles.view}>
                <ImageBackground source={Img.background} style={styles.imageBackground}>
                    <View style={styles.header}>
                        <View style={styles.header}>
                            <View style={styles.TextContainer} >
                                <Text style={styles.TextBasic}>Partie terminée</Text>
                                <Text style={styles.textResult}>{resultGame}</Text>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.MenuButtonContainer}>
                                <Button title="Menu principal" onPress={() => this.props.navigation.navigate('Home')} color="#138a72" />
                            </View>
                        </View>

                        <View style={styles.MenuButtonContainer}>
                            {/* route always executed, even without pressing the button */}
                            {/*<MenuButton routeName="Home" buttonText="Menu principal" navigation={this.navigation}/> */}
                        </View>
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
        //borderWidth: -100,
        width: '100%',
        height: '100%',

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
        marginTop: 50,
    },
    button: {
        marginBottom: 10,
    },
    MenuButtonContainer:{
        flex: 2,
        marginBottom: 30,
        marginTop: 150,
    },
    MenuButton:{
        
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
    TextContainer:{
        marginTop:300,
        marginBottom:50,
        color:'red',
    },
    TextBasic:{
        color:'red',
        fontSize:20,
    },
    textResult:{
        color:'red',
        fontSize:40,
    }

});
