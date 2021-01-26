import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet , Image, TouchableOpacity, ImageBackground} from 'react-native';
//import 'react-native-gesture-handler';
import Img from '../assets/images/_image';
import CircleScore from './Layout/CircleScore';
import Card from './Layout/Card';
import '../stores/GameController';
import '../stores/UserController';
import 'localstorage-polyfill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse';
import db from '../utils/database';

const br = `\n`;

export default class MultiGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameFound : 0,
            maxSet : 3,
            PlayerUserChoice: '',
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
            player2Hasplayed : 1,
            enemyCurrentChoice : null,
            choicesIsFinished : 0,
        };

        this.idGame = null;
        this.pointPlayer2 = 0;
        this.pointUser = 0;
        this.currentSet = 0;
        this.idUser = Math.floor(Math.random() * Math.floor(15000)).toString();
        this.placePlayerInDatabase= null;

        //this.enemyCurrentChoice = 'feuille';
        this.enemyCurrentChoice = null;

    }

    componentDidMount(){
        this.searchOtherPlayerAndInitializeGame();
    }

    updateGame = async (result, userChoice, Player2Choice) => {

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

                        if(this.placePlayerInDatabase == '1'){incrementPointPlayer1(this.idGame);}
                        else if(this.placePlayerInDatabase == '2'){incrementPointPlayer2(this.idGame);}

                        if (currentSet == 1) { this.setState({colorSet1 : 'green'}) };
                        if (currentSet == 2) { this.setState({colorSet2 : 'green'}) };
                        if (currentSet == 3) { this.setState({colorSet3 : 'green'}) };
                    }

                    else if (result == "Perdu"){
                        if (currentSet == 1) { this.setState({colorSet1 : 'red'}) };
                        if (currentSet == 2) { this.setState({colorSet2 : 'red'}) };
                        if (currentSet == 3) { this.setState({colorSet3 : 'red'}) };

                        if(this.placePlayerInDatabase == '1'){incrementPointPlayer2(this.idGame);}
                        else if(this.placePlayerInDatabase == '2'){incrementPointPlayer1(this.idGame);}
                    }
                }
            }
            this.setState({colorSet1 : 'green'})
        }
    }

    MakeSet = async (userChoice) => {
        //Push user choice in database 

        /*
        this.setState({
            visibilityUserCard: 0,
            visibilityEnemyCard: 0,
            //cardToDisplayUser: userChoice,
            //cardToDisplayEnemy: Player2Choice,
        });
        */

        var query = new Parse.Query('GameInstance');
        query.equalTo("id", this.idGame);
        game = await db.get('GameInstance', this.idGame );


        //console.log("gg", game, userChoice, this.placePlayerInDatabase)
        if(userChoice != null){
            if(this.placePlayerInDatabase == '1'){
                game.set('P1CurrentChoice', userChoice);
                game.save();
            }
            else if(this.placePlayerInDatabase == '2'){
                game.set('P2CurrentChoice', userChoice);
                game.save();
            }
        }
        else{
            console.log('user choice is null');
        }

        let Player2Choice = null;
        if (this.state.enemyCurrentChoice != null){
            Player2Choice = this.state.enemyCurrentChoice;
        }
        
        //console.log('game', game)
        if(Player2Choice != null && userChoice != null){
            this.setState({choicesIsFinished : 1 });
        }
        // if 2 players are played: Make a set                  // state : choicesIsFinished
        let result = null;

        if(this.state.choicesIsFinished == 1) {
            //if(Player2Choice == 'pierre' || Player2Choice == 'ciseau' || Player2Choice == 'feuille' ){
                if (Player2Choice == userChoice){  result = "null";  this.currentSet = this.currentSet -1;}
                else if (Player2Choice == "pierre" && userChoice == "feuille"){ result = "Gagné";}
                else if (Player2Choice == "pierre" && userChoice == "ciseau"){ result = "Perdu";}
                else if (Player2Choice == "feuille" && userChoice == "ciseau"){ result = "Gagné";}
                else if (Player2Choice == "feuille" && userChoice == "pierre"){ result = "Perdu";}
                else if (Player2Choice == "ciseau" && userChoice == "pierre"){ result = "Gagné";}
                else if (Player2Choice == "ciseau" && userChoice == "feuille"){ result = "Perdu";}
                    
                if (this.currentSet <= 3){ this.currentSet = this.currentSet + 1; }
                console.log('player2 choice: ' + Player2Choice);
                console.log('user choice: ' + userChoice);
                this.updateGame(result,userChoice,Player2Choice);
                this.redirectGame();
                return  ;  
            //}
        }

        //this.setState({choicesIsFinished : 0 });
        // reset CurrentChoice
        if(Player2Choice != null && userChoice != null){
            //this.setState({choicesIsFinished : 0 });
            game.set('P1CurrentChoice', null);
            game.set('P2CurrentChoice', null);
            game.save();
        }
        
        return ;
    }

    redirectGame = async () => {

        game = await db.get('GameInstance', this.idGame );
        this.pointPlayer2 = game.attributes.P2Point;
        this.pointUser = game.attributes.P1Point;
        
        let navigation = this.props.navigation;

        if(this.placePlayerInDatabase == '1'){
            if (this.currentSet >= 3 && this.pointPlayer2 >= 2 ){
                
                setTimeout(function(){
                    game.set('result', 'Defeat');
                    game.save();
                    navigation.navigate('EndGame',{ result: ['Défaite'] });
                }, 400);
            }
            else if (this.currentSet >= 3 && this.pointUser >= 2){
                setTimeout(function(){
                    game.set('result', 'Victory');
                    game.save();
                    navigation.navigate('EndGame',{ result: ['Victoire'] });
                }, 400);
            }
        }
        else if(this.placePlayerInDatabase == '2'){
            if (this.currentSet >= 3 && this.pointUser >= 2 ){
                
                setTimeout(function(){
                    game.set('result', 'Defeat');
                    game.save();
                    navigation.navigate('EndGame',{ result: ['Défaite'] });
                }, 400);
            }
            else if (this.currentSet >= 3 && this.pointPlayer2 >= 2){
                setTimeout(function(){
                    game.set('result', 'Victory');
                    game.save();
                    navigation.navigate('EndGame',{ result: ['Victoire'] });
                }, 400);
            }
        }
    }

    //TODO: delete game instance if player is not connected

    searchOtherPlayerAndInitializeGame = async () => {

        this.idGame = await searchGameInstanceWithEmptyPlayer2();
        // join a existing game 
        if( this.idGame != null ){
            console.log('Game found : id = ' + this.idGame);
            await subscribeInAGame('player2',this.idGame, this.idUser)
            this.placePlayerInDatabase = '2';
        }
        // if game is not found, create game instance and wait a player2
        else{
            await createGameInstance(this.idUser);
            this.idGame = localStorage.getItem("gameId");
            console.log('Game was created : ' + this.idGame);
            //db.listenPlayer("GameInstance", this.idGame, () => { if (this.state.gameFound != 1){this.setState({ gameFound : 1 });} } ) 
            this.placePlayerInDatabase = '1';

        }      
        
        db.listen("GameInstance", this.idGame, (gameReturn) => {
            console.log('Listen a game', gameReturn);
            if (this.state.gameFound != 1){
                this.setState({ gameFound : 1 });
            } 
            else {
                if(this.placePlayerInDatabase == '1'){
                    this.enemyCurrentChoice = gameReturn.attributes.P2CurrentChoice; 
                    this.setState({enemyCurrentChoice : gameReturn.attributes.P2CurrentChoice});
                }
                else{
                    this.enemyCurrentChoice = gameReturn.attributes.P1CurrentChoice;
                    this.setState({enemyCurrentChoice : gameReturn.attributes.P1CurrentChoice});
                }  
            }
        }).then((success) => { console.log("subscribe status ") }, (error) => { console.log(error.message)});
                 
    }

    render = () => {
        const { visibilityUserCard, visibilityEnemyCard, cardToDisplayEnemy, cardToDisplayUser, colorSet1, colorSet2, colorSet3, gameFound, enemyCurrentChoice } = this.state;

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
                                {/*<Button onpress={this.ManualPlayer2Choice()} title="Make Enemy Choice" ><Text>Make Enemy Choice</Text> </Button>*/}
                                <CircleScore colorSet1={colorSet1} colorSet2={colorSet2} colorSet3={colorSet3} />
                            </View>
                            <View style={[styles.containerUserCardPlayed, { opacity: visibilityUserCard } ]}>
                                <Image source={Img[cardToDisplayUser]} resizeMode="contain" style={styles.CardPlayedUser} />
                                {/*<CardPlayed icon={Img[cardToDisplayUser]} texture={Img.carteBois} ></CardPlayed>*/}
                            </View>
                            <Text style={styles.setText}> Coup n°{ this.currentSet } </Text>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                                <Card onPress={() => this.MakeSet("ciseau")} icon={Img.ciseau} texture={Img.carteBois} color="rgba(191,44,44,1)"/>
                                <Card onPress={() => this.MakeSet("feuille")} icon={Img.feuille} texture={Img.carteBois} color="rgba(242,203,5,1)"/>
                                <Card onPress={() => this.MakeSet("pierre")} icon={Img.pierre} texture={Img.carteBois} color="rgba(74,140,91,1)"/>
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
        marginLeft:150,
        fontWeight: 'bold',
    },
    centerText:{
        marginTop: 300,
        justifyContent: 'center',
        fontSize: 30,
        marginLeft:50,
        fontWeight: 'bold',
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
        color: 'white',
    },
    setText:{
        fontSize: 15,
        marginBottom: 10,
    }
});