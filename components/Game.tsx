import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet } from 'react-native';

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
            set : 1,
            maxSet : 3,
            //currentUserChoice : false,
            MachineChoice: ''
        };
    }

    MakeGame() {
        //console.log('Make a Game');
        var userPoints = 0;
        var machinePoints = 0;
        //this.setState({ set: this.state.set + 1 })
        return 0;
    }

    MakeMachineChoice(){

        const choice = ['Feuille', 'Ciseaux', 'Pierre']
        /* Make a random choice */
        const random = Math.floor(Math.random() * choice.length);
        //console.log(random, choice[random]);

        this.state = { MachineChoice: choice[random] };
        return choice[random];
        
    }

    // And decide Who Win one set
    MakeSet(userChoice){
        //console.log('makeSet Function executed');
        //var MachineChoice = this.state.MachineChoice;
        
        const MachineChoice = this.MakeMachineChoice() ;

        console.log('choix machine :' + MachineChoice);
        console.log('choix user :' + userChoice );

        if (MachineChoice == userChoice){
            var result = "null"
            console.log('match nul');
        }
        else if (MachineChoice == "Pierre" && userChoice == "Feuille"){
            var result = "Perdu"
            console.log('Perdu');
        }
        else if (MachineChoice == "Pierre" && userChoice == "Ciseaux"){
            var result = "Perdu"
            console.log('Perdu');
        }
        else if (MachineChoice == "Feuille" && userChoice == "Ciseaux"){
            var result = "Gagné"
            console.log('Gagné');
        }
        else if (MachineChoice == "Feuille" && userChoice == "Pierre"){
            var result = "Gagné"
            console.log('Gagné');
        }
        else if (MachineChoice == "Ciseaux" && userChoice == "Pierre"){
            var result = "Gagné"
            console.log('Gagné');
        }
        else if (MachineChoice == "Ciseaux" && userChoice == "Feuille"){
            var result = "Perdu"
            console.log('Perdu');
        }

        return 0;
    }

    render(){

        var set = this.state.set;
        this.MakeGame();
        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    <Text> Manche {set}</Text>
                    <View style={{flex:0, marginTop:10, padding: 15}} >
                        {/* onClick={() => this.MakeSet("Pierre")} */}
                        <Button className="square" onPress={() => this.MakeSet("Pierre")} title="Pierre"/> 
                    </View>
                    <View style={{flex:0, marginTop:10, padding: 15}} >
                        <Button className="square" onPress={() => this.MakeSet("Feuille")} title="Feuille"/>
                    </View>
                    <View style={{flex:0, marginTop:10, padding: 15}} >
                        <Button className="square" onPress={() => this.MakeSet("Ciseaux")} title="Ciseaux"/>
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