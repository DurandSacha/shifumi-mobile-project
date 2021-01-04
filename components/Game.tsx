import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet } from 'react-native';

function MakeMachineChoice(){
    return 0;
}

const br = `\n`;

export default class Game extends Component {

    // TODO : Displaying a set number 
    // TODO : Record Data : which elements wins over the other?
    // TODO : Compare user choice and IA choice
    // TODO : Count the points
    // TODO : Send a victory or defeat screen

    
    constructor(props) {
        super(props);

        this.state = {
            set: 0,
            maxSet: 3,
            currentChoice : false
        };
    }

    
    render(){
        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    <Text> Ton adversaire attend ton choix {br}{br}{br}{br}{br}</Text>

                    <View style={{flex:0, marginTop:10, padding: 15}} >
                        <Button className="square" onClick={function() { alert('clic'); } } title="Pierre"/> 
                    </View>
                    <View style={{flex:0, marginTop:10, padding: 15}} >
                        <Button className="square" onClick={function() { alert('clic'); } } title="Feuille "/>
                    </View>
                    <View style={{flex:0, marginTop:10, padding: 15}} >
                        <Button className="square" onClick={function() { alert('clic'); } } title="Ciseaux"/>
                    </View>
                </View>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    square : {
        marginBottom:10,
        marginTop:10,
        padding: 15,
    },
    view: {
        flex: 1,
        backgroundColor: '#1abc9c',
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    boardContainer: {
        flex: 4,
    },
    scoreContainer: {
        flex: 2,
    },
    scoreColorTwo: {
        backgroundColor: '#34495e',
    },
    scoreColorOne: {
        backgroundColor: '#9b59b6',
    },
});


/******************  HELP  ******************************/
/*
-------------------customizable button--------------------
<TouchableHighlight 
                style ={{
                    height: 40,
                    width:160,
                    borderRadius:10,
                    backgroundColor : "yellow",
                    marginLeft :50,
                    marginRight:50,
                    marginTop :20
                }}>
            <Button onPress={this._onPressButton}            
            title="SAVE"
            accessibilityLabel="Learn more about this button"
          /> 
          </TouchableHighlight>

*/