import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Navigator, Button, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Img from '../assets/images/_image';

const br = `\n`;

export default class Configuration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            radioSet: ['1', '2', '3', '4'],
            radioDifficulty: ['Easy', 'Medium', 'Hard', 'Impossible'],
            checkedSet: 0,
            checkedDifficulty: 0
        }

        // SAVE AND EXPORT CONFIGURATION 
    }

    render() {
        return (
            <View style={styles.view}>
                <ImageBackground source={Img.background} style={styles.imageBackground}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Configuration{br}{br}{br}</Text>
                        <Text style={styles.textConfig}> Nombre de manche{br}</Text>

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                            {this.state.radioSet.map((data, key) => {
                                return (
                                    <View key={key}>
                                        {this.state.checkedSet == key ?
                                            <TouchableOpacity style={styles.btn}>
                                                <Image style={styles.imgBtn} source={Img.selected}/>
                                                <Text>{data}</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={()=>{this.setState({checkedSet: key})}} style={styles.btn}>
                                                <Image style={styles.imgBtn} source={Img.noSelected} />
                                                <Text>{data}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                )
                            })}
                        </View>

                        {/**************************************************************************************** */}

                        <Text style={styles.textConfig}> Difficulté {br}</Text>

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                            {this.state.radioDifficulty.map((data, key) => {
                                return (
                                    <View key={key}>
                                        {this.state.checkedDifficulty == key ?
                                            <TouchableOpacity style={styles.btn}>
                                                <Image style={styles.imgBtn} source={Img.selected}/>
                                                <Text>{data}</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={()=>{this.setState({checkedDifficulty: key})}} style={styles.btn}>
                                                <Image style={styles.imgBtn} source={Img.noSelected} />
                                                <Text>{data}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textConfig: {
        fontWeight: 'bold',
        fontSize: 18
    },
    imageBackground: {
        flex: 4,
        width: '100%',
        height: '100%',
    },
    btn : {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginRight: 15,
    },
    imgBtn : {
        width: 20,
        height: 20,
    },
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
        color: 'black',
        marginTop: 16,
        fontWeight: 'bold',
    },
    content: {
        flex: 2,
    },
    button: {
        marginBottom: 10,
    },
});