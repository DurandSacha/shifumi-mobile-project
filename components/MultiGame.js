import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet , Image, TouchableOpacity, ImageBackground} from 'react-native';
import 'react-native-gesture-handler';
import Img from '../assets/images/_image';
import CircleScore from './Layout/CircleScore';
import Card from './Layout/Card';
import '../stores/GameController';

const br = `\n`;

export default class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameFound : 0,
            maxSet : 3,
            Player2Choice: '',
            colorSet1: 'grey',
            colorSet2: 'grey',
            colorSet3: 'grey',
            visibilityEnemyCard : 0,
            visibilityUserCard : 0,
            cardToDisplayUser : 'feuille',
            cardToDisplayEnemy : 'feuille',
            pointPlayer2 : 0,
            pointUser : 0,
            player2Hasplayed : 0,
        };

        this.pointPlayer2 = 0;
        this.pointUser = 0;
        this.currentSet = 0;
    }

    makePlayer2Choice = () => {
        this.setState({player2Hasplayed : 1});
        // TODO: wait player2 response
        return 'feuille';
    }

    updateGame = (result, userChoice, Player2Choice) => {

        if(this.state.player2Hasplayed == 1){
            this.setState({
                visibilityUserCard: 1,
                visibilityEnemyCard: 1,
                cardToDisplayUser: userChoice,
                cardToDisplayEnemy: Player2Choice,
            });

            let currentSet = this.currentSet;

            let i = 0
            while (i <= 3) {
                i = i + 1;
                if (currentSet == i){
                    if(result == "null"){}
                    else if (result == "Gagné"){
                        this.pointUser = this.pointUser + 1 ;
                        if (currentSet == 1) { this.setState({colorSet1 : 'green'}) };
                        if (currentSet == 2) { this.setState({colorSet2 : 'green'}) };
                        if (currentSet == 3) { this.setState({colorSet3 : 'green'}) };
                    }
                    else{
                        if (currentSet == 1) { this.setState({colorSet1 : 'red'}) };
                        if (currentSet == 2) { this.setState({colorSet2 : 'red'}) };
                        if (currentSet == 3) { this.setState({colorSet3 : 'red'}) };
                        this.pointPlayer2 = this.pointPlayer2 + 1 ;
                    }
                }
            }
            //this.setState({player2Hasplayed : 0});
        }
    }

    MakeSet = (userChoice) => {
        
        let Player2Choice = this.makePlayer2Choice() ;
        // after player 2 make choice
        if(this.state.player2Hasplayed == 1){
            if (Player2Choice == userChoice){  var result = "null";  this.currentSet = this.currentSet -1;}
            else if (Player2Choice == "pierre" && userChoice == "feuille"){var result = "Gagné";}
            else if (Player2Choice == "pierre" && userChoice == "ciseau"){var result = "Perdu";}
            else if (Player2Choice == "feuille" && userChoice == "ciseau"){var result = "Gagné";}
            else if (Player2Choice == "feuille" && userChoice == "pierre"){var result = "Perdu";}
            else if (Player2Choice == "ciseau" && userChoice == "pierre"){var result = "Gagné";}
            else if (Player2Choice == "ciseau" && userChoice == "feuille"){var result = "Perdu";}
        }
        if(this.state.player2Hasplayed == 1){
            if (this.currentSet <= 3){ this.currentSet = this.currentSet + 1; }
        }
        this.updateGame(result,userChoice,Player2Choice);
        this.forceUpdate();
        this.redirectGame();
        return ;  
        
    }

    redirectGame = () => {
        let navigation = this.props.navigation;
        if (this.currentSet >= 3 && this.pointPlayer2 >= 2 ){
            setTimeout(function(){
                navigation.navigate('EndGame',{ result: ['Défaite'] });
             }, 700);
        }
        else if (this.currentSet >= 3 && this.pointUser >= 2){
            //console.log('victory part'); 
            setTimeout(function(){
                navigation.navigate('EndGame',{ result: ['Victoire'] });
             }, 700);
        }
    }

    /* Call before rendering */
    componentDidMount(){
        this.searchOtherPlayer();
    }

    searchOtherPlayer = () => {
        //createGameInstance();

        // search oter game in database with empty player2 column
        // if have no place, Instance one object game in database
        // subscribe to player1 
        // wait player2 subscribing 
        // Launch the game 
        // comparate a choice                 
        
        //  this.setState({gameFound : 1 });
    }

    render =() => {
        const { visibilityUserCard, visibilityEnemyCard, cardToDisplayEnemy, cardToDisplayUser, colorSet1, colorSet2, colorSet3, gameFound } = this.state;

        if(gameFound == 0){
            return(
                <View style={styles.view}>
                     <ImageBackground source={Img.background} style={styles.imageBackground}>
                        <Text style={styles.centerText}>Recherche d'adversaire</Text>
                        <Text style={styles.centerTextMin}>Patientez...</Text>
                    </ImageBackground>
                </View>
            )
        }
        else if(gameFound == 1){
            return (
                <View style={styles.view}>
                    <ImageBackground source={Img.background} style={styles.imageBackground}>
                        <View style={styles.header}>
                            <Image source={Img.dosCarte} resizeMode="contain" style={styles.enemyCard}/>
                            <View style={[styles.containerEnemyCardPlayed, { opacity: visibilityEnemyCard   }]}>
                                <Image source={Img[cardToDisplayEnemy]} resizeMode="contain" style={styles.CardPlayedEnemy} />
                            </View>

                            <View>
                                <Text style={styles.BattleText}>Manche en cours</Text>
                                <CircleScore colorSet1={colorSet1} colorSet2={colorSet2} colorSet3={colorSet3} />
                            </View>

                            <View style={[styles.containerUserCardPlayed, { opacity: visibilityUserCard } ]}>
                                <Image source={Img[cardToDisplayUser]} resizeMode="contain" style={styles.CardPlayedUser} />
                            </View>

                            <Text style={styles.setText}> Coup n°{ this.currentSet } </Text>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                                
                                <Card onPress={() => this.MakeSet("ciseau")} icon={Img.ciseau} color="rgba(191,44,44,1)"/>
                                <Card onPress={() => this.MakeSet("feuille")} icon={Img.feuille} color="rgba(242,203,5,1)"/>
                                <Card onPress={() => this.MakeSet("pierre")} icon={Img.pierre} color="rgba(74,140,91,1)"/>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    centerTextMin:{
        marginTop: 30,
        justifyContent: 'center',
        fontSize: 25,
        marginLeft:145
    },
    centerText:{
        marginTop: 300,
        justifyContent: 'center',
        fontSize: 30,
        marginLeft:45
    },
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
    CardPlayedUser: {
        width: 90,
        height: 60,
        marginTop: 110,
        marginBottom: 75,
    },
    CardPlayedEnemy: {
        width: 80,
        height: 55,
        marginTop: -110,
        marginBottom: 75,

    },
    containerEnemyCardPlayed: {
        transform: [
            { rotate: "90deg" },
            { translateX: -130 },
            { translateY: 100 }
        ],
    },
    containerUserCardPlayed: {
        transform: [
            { rotate: "-90deg" },
            { translateX: 0 },
            { translateY: -20 }
        ],
    },
    BattleText: {
        fontSize: 17,
        marginTop: -45,
        fontWeight: "bold",
    },
    setText:{
        fontSize: 15,
        marginBottom: 10,
    }
});