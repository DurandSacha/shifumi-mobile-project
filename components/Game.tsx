import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet , Image, TouchableOpacity, ImageBackground } from 'react-native';

const br = `\n`;

export default class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSet : 0,
            maxSet : 3,
            //currentUserChoice : false,
            MachineChoice: '',
            colorSet1: 'grey',
            colorSet2: 'grey',
            colorSet3: 'grey',

        };

        this.currentSet = 0;
        this.visibilityEnemyCard = false;
        this.visibilityUserCard = false ;

        this.updateGame = this.updateGame.bind(this);
    }

    MakeMachineChoice = () => {

        const choice = ['Feuille', 'Ciseaux', 'Pierre']
        /* Make a random choice */
        const random = Math.floor(Math.random() * choice.length);
        //console.log(random, choice[random]);

        this.state = { MachineChoice: choice[random] };
        return choice[random];
        
    }

    updateGame = (result) => {

        console.log('Update : ' + result );
        //console.log('currentSet : ' + currentSet );
        //console.log('updateGame');
        console.log(this.state);
        var currentSet = this.currentSet;
        //var currentSet = this.state.currentSet;
        //var currentSet = this.state.currentSet;

        if (currentSet == 1){
            if (result == "Gagné"){
                this.setState({colorSet1: 'green'});
            }
            else if(result == "null"){}
            else{
                this.setState({colorSet1: 'red'});
            }
        }

        if (currentSet == 2){
            if (result == "Gagné"){
                this.setState({colorSet2: 'green'});
            }
            else if(result == "null"){}
            else{
                this.setState({colorSet2: 'red'});
            }
        }
        if (currentSet == 3){
            if (result == "Gagné"){
                this.setState({colorSet3: 'green'});
            }
            else if(result == "null"){}
            else{
                this.setState({colorSet3: 'red'});
            }

            console.log('Game Finished');
        }
        console.log(result);

        //TODO: Finish game if set = 3 and decide who is winner (who have 2 set ) (06/01)
        //TODO: Redirection to resume menu  
    }

    // And decide Who Win one set
    MakeSet = (userChoice) => {
        
        const MachineChoice = this.MakeMachineChoice() ;

        //console.log('choix machine :' + MachineChoice);
        //console.log('choix user :' + userChoice );

        if (MachineChoice == userChoice){
            var result = "null";
            this.currentSet = this.currentSet -1;
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

        
        this.currentSet = this.currentSet + 1;
        this.updateGame(result);

        //TODO: Displaying card played  (06/01)
        // One : Disable image
        // Two : Get different choice 
        // Three : Displaying good image
        return ;  
    }

    render(){

        return (
            <View style={styles.view}>
                <ImageBackground source={require('../assets/images/Background.png')} style={styles.imageBackground}>
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
                            {/* this.visibilityEnemyCard */}

                        <Text style={styles.BattleText}>Choisissez une carte</Text>

                        {/***********SET SCORE  *****************/}
                        <View style={styles.AroundScoreContainer}>
                            <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet1 }]} ></View>
                            <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet2 }]} ></View>
                            <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet3 }]} ></View>
                        </View>
                        {/*************CARD PLAYED ************ */}
                        <Image
                            source={require('../assets/images/ciseau.png')} /* Take a correct picture */
                            resizeMode="contain"
                            style={styles.CardPlayed}
                            />
                            {/* this.visibilityUserCard */}


                        {/*************  CARD ********************/}
                        <Text style={styles.setText}> Manche {this.state.currentSet} </Text>
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
                </ImageBackground>
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
    imageBackground: {
        flex: 4,
        //borderWidth: -100,
        width: '100%',
        height: '100%',

    },
    view: {  
        flex: 1,
        backgroundColor: '#1abc9c',
        //backgroundImage: '',
        
        //paddingLeft: 10,
        //paddingRight: 10,
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