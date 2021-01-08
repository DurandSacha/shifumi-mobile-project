import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet , Image, TouchableOpacity, ImageBackground} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Img from '../assets/images/_image';
import EndGame from './EndGame';

const br = `\n`;

export default class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maxSet : 3,
            MachineChoice: '',
            colorSet1: 'grey',
            colorSet2: 'grey',
            colorSet3: 'grey',
            visibilityEnemyCard : 0,
            visibilityUserCard : 0,
            cardToDisplayUser : 'feuille',
            cardToDisplayEnemy : 'feuille',
            pointMachine : 0,
            pointUser : 0,
        };

        this.pointMachine = 0;
        this.pointUser = 0;

        this.currentSet = 0;
    }

    makeMachineChoice = () => {
        // TODO: make better than random 
        const choice = ['feuille', 'ciseau', 'pierre']
        const random = Math.floor(Math.random() * choice.length);
        this.state = { MachineChoice: choice[random] };
        return choice[random];
    }

    updateGame = (result, userChoice, MachineChoice) => {

        this.setState({
            visibilityUserCard: 1,
            visibilityEnemyCard: 1,
            cardToDisplayUser: userChoice,
            cardToDisplayEnemy: MachineChoice,
        });

        let currentSet = this.currentSet;
        if (currentSet == 1){
            if (result == "Gagné"){
                this.pointUser = this.pointUser + 1 ;
                this.setState({colorSet1: 'green'});
            }
            else if(result == "null"){}
            else{
                this.setState({colorSet1: 'red'});
                this.pointMachine = this.pointMachine + 1 ;
            }
        }
        else if(currentSet == 2){
            if (result == "Gagné"){
                this.pointUser = this.pointUser + 1 ;
                this.setState({colorSet2: 'green'});
            }
            else if(result == "null"){}
            else{
                this.setState({colorSet2: 'red'});
                this.pointMachine = this.pointMachine + 1 ;
            }
        }
        else if(currentSet == 3){
            if (result == "Gagné"){
                this.pointUser = this.pointUser + 1 ;
                this.setState({colorSet3: 'green'});
                currentSet == currentSet + 10
            }
            else if(result == "null"){}
            else{
                this.setState({colorSet3: 'red'});
                this.pointMachine = this.pointMachine + 1 ;
            }  
        }
    }

    MakeSet = (userChoice) => {
        
        let MachineChoice = this.makeMachineChoice() ;

        if (MachineChoice == userChoice){  var result = "null";  this.currentSet = this.currentSet -1;}
        else if (MachineChoice == "pierre" && userChoice == "feuille"){var result = "Gagné";}
        else if (MachineChoice == "pierre" && userChoice == "ciseau"){var result = "Perdu";}
        else if (MachineChoice == "feuille" && userChoice == "ciseau"){var result = "Gagné";}
        else if (MachineChoice == "feuille" && userChoice == "pierre"){var result = "Perdu";}
        else if (MachineChoice == "ciseau" && userChoice == "pierre"){var result = "Gagné";}
        else if (MachineChoice == "ciseau" && userChoice == "feuille"){var result = "Perdu";}

        if (this.currentSet <= 3){ this.currentSet = this.currentSet + 1; }
        this.updateGame(result,userChoice,MachineChoice);
        this.redirectGame();
        this.forceUpdate();

        return ;  
    }

    redirectGame = () => {

        let navigation = this.props.navigation;
        // ENDGAME 
        if (this.currentSet >= 3 && this.pointMachine >= 2 ){
            setTimeout(function(){
                navigation.navigate('EndGame',{ result: ['defeat'] });
             }, 100);
        }
        if(this.currentSet >= 3 && this.pointUser >= 2) { 
            setTimeout(function(){
                navigation.navigate('EndGame',{ result: ['victory'] });
             }, 100); // 700 
        }
    }

    render =() => {

        const { visibilityUserCard, visibilityEnemyCard, cardToDisplayEnemy, cardToDisplayUser, colorSet1, colorSet2, colorSet3 } = this.state;

        return (
            <View style={styles.view}>
                <ImageBackground source={Img.background} style={styles.imageBackground}>
                    <View style={styles.header}>
                        <Image
                            source={Img.dosCarte}
                            resizeMode="contain"
                            style={styles.enemyCard}
                            />
                        <View style={[styles.containerEnemyCardPlayed, { opacity: visibilityEnemyCard   }]}>
                            <Image
                                source={Img[cardToDisplayEnemy]}
                                resizeMode="contain"
                                style={styles.CardPlayed}
                                />
                        </View>

                        <Text style={styles.BattleText}>Choisissez une carte</Text>

                        <View style={styles.AroundScoreContainer}>
                            <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet1 }]} ></View>
                            <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet2 }]} ></View>
                            <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet3 }]} ></View>
                        </View>

                        <View style={[styles.containerUserCardPlayed, { opacity: visibilityUserCard } ]}>
                            <Image
                                source={Img[cardToDisplayUser]}
                                resizeMode="contain"
                                style={styles.CardPlayed}
                                />
                        </View>

                        {/*************  CHOOSE A CARD ********************/}
                        <Text style={styles.setText}> Coup n°{this.currentSet + 1} </Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                            <View style={styles.container1}>
                                <View style={styles.rect}>
                                <TouchableOpacity onPress={() => this.MakeSet("ciseau")}>
                                    <Image
                                    source={Img.ciseau}
                                    resizeMode="contain"
                                    style={styles.image1}
                                    />
                                </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.container2}>
                                <View style={styles.rect}>
                                    <TouchableOpacity onPress={() => this.MakeSet("feuille")}>
                                        <Image
                                        source={Img.feuille}
                                        resizeMode="contain"
                                        style={styles.image1}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.container3}>
                                <View style={styles.rect}>
                                    <TouchableOpacity onPress={() => this.MakeSet("pierre")}>
                                        <Image
                                        source={Img.pierre}
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
    view: {  
        flex: 1,
        backgroundColor: '#1abc9c',
    },
    square : {
        marginBottom:2,
        marginTop:2,
        padding: 2,
    },
    imageBackground: {
        flex: 4,
        width: '100%',
        height: '100%',
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
      },
    enemyCard: {
        width: 1500,
        height: 300,
    },
    CardPlayed: {
        width: 50,
        height: 40,
        marginTop: -110,
        marginBottom: 75,
    },
    containerEnemyCardPlayed: {
        transform: [
            { rotate: "90deg" },
            { translateX: -100 },
            { translateY: 100 }
        ],
    },
    containerUserCardPlayed: {
        transform: [
            { rotate: "-90deg" },
            { translateX: 70 },
            { translateY: 100 }
        ],
    },
    BattleText: {
        fontSize: 17,
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