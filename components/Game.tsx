import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet , Image, TouchableOpacity } from 'react-native';

const br = `\n`;

export default class Game extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            set : 0,
            maxSet : 3,
            //currentUserChoice : false,
            MachineChoice: '',
            colorSet1: 'grey',
            colorSet2: 'grey',
            colorSet3: 'grey',

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
        
        const MachineChoice = this.MakeMachineChoice() ;

        console.log('choix machine :' + MachineChoice);
        console.log('choix user :' + userChoice );

        if (MachineChoice == userChoice){
            var result = "null";
        }
        else if (MachineChoice == "Pierre" && userChoice == "Feuille"){
            var result = "Gagné";
        }
        else if (MachineChoice == "Pierre" && userChoice == "Ciseaux"){
            var result = "Perdu";
        }
        else if (MachineChoice == "Feuille" && userChoice == "Ciseaux"){
            var result = "Gagné";
        }
        else if (MachineChoice == "Feuille" && userChoice == "Pierre"){
            var result = "Perdu";
        }
        else if (MachineChoice == "Ciseaux" && userChoice == "Pierre"){
            var result = "Gagné";
        }
        else if (MachineChoice == "Ciseaux" && userChoice == "Feuille"){
            var result = "Perdu";
        }
        //TODO: increment State 
        this.setState({ set: this.state.set + 1 })

        //TODO: Displaying card played 

        //TODO: Update set color circle 
        
        //TODO: Finish game if set = 3 and decide who is winner


        console.log(result);
        return ;  
    }

    render(){

        return (
            <View style={styles.view}>
                <View style={styles.header}>

                    <Image
                        source={require('../assets/images/dosCarte4.png')}
                        resizeMode="contain"
                        style={styles.enemyCard}
                        />
                    
                    {/*************CARD PLAYED ************ */}
                    <Image
                        source={require('../assets/images/ciseau.png')} /* Take a correct picture */
                        resizeMode="contain"
                        style={styles.CardPlayed}
                        />

                    <Text style={styles.BattleText}>Choisissez une carte</Text>

                    {/***********SET SCORE  *****************/}
                    <View style={styles.AroundScoreContainer}>
                        <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet1 },]} ></View>
                        <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet2 },]} ></View>
                        <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet3 },]} ></View>
                    </View>
                    {/*************CARD PLAYED ************ */}
                    <Image
                        source={require('../assets/images/ciseau.png')} /* Take a correct picture */
                        resizeMode="contain"
                        style={styles.CardPlayed}
                        />


                    {/*************  CARD ********************/}
                    <Text style={styles.setText}> Manche 1 </Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                        <View style={styles.container1}>
                            <View style={styles.rect}>
                            <TouchableOpacity onPress={() => this.MakeSet("Ciseaux")}>
                                <Image
                                source={require('../assets/images/ciseau.png')}
                                resizeMode="contain"
                                style={styles.image1}
                                />
                            </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.container2}>
                            <View style={styles.rect}>
                                <TouchableOpacity onPress={() => this.MakeSet("Feuille")}>
                                    <Image
                                    source={require('../assets/images/feuille.png')}
                                    resizeMode="contain"
                                    style={styles.image1}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.container3}>
                            <View style={styles.rect}>
                                <TouchableOpacity onPress={() => this.MakeSet("Pierre")}>
                                    <Image
                                    source={require('../assets/images/pierre.png')}
                                    resizeMode="contain"
                                    style={styles.image1}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    square : {
        marginBottom:2,
        marginTop:2,
        padding: 2,
    },
    view: {  //TODO: Place Background Image
        flex: 1,
        backgroundColor: '#1abc9c',
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
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
    image1: {
        width: 70,
        height: 70,
        //backgroundColor: 'rgba(255,10,44,1)'
      },
    enemyCard: {
        width: 1500,
        height: 300,
    //backgroundColor: 'rgba(255,10,44,1)'
    },
    CardPlayed: {
        width: 50,
        height: 40,
        marginTop: -110,
        marginBottom: 75,
    },
    BattleText: {
        fontSize: 15,
        marginTop: 0,
        fontWeight: "bold",
    },
    setText:{
        fontSize: 15,
        marginBottom: 0,
    },
    AroundScore:{
        width: 20,
        height: 20,
        borderRadius: 150/2,
        justifyContent: 'center',
        backgroundColor: '#888888',
        marginRight: 5
    },
    AroundScoreContainer:{
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'stretch',
        marginTop: 5,
        

    }

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