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

export default class MultiPlayer extends Component {

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
            visibilityNextSetButton : 0,
            cardToDisplayUser : '',
            cardToDisplayEnemy : '',
            pointPlayer2 : 0,
            pointUser : 0,
            player2Hasplayed : 1,
            enemyCurrentChoice : null,
            userCurrentChoice : null,
            choicesIsFinished : 0,
            visibilityCards : 1,
            textSet : 'Manche en cours',
        };

        this.idGame = null;
        this.pointPlayer2 = 0;
        this.pointUser = 0;
        this.currentSet = 1;
        this.idUser = Math.floor(Math.random() * Math.floor(15000)).toString();
        this.placePlayerInDatabase= null;


    }

    componentDidMount(){
        this.searchOtherPlayerAndInitializeGame();
    }

    // SearchGame // create Game // listen database 
    searchOtherPlayerAndInitializeGame = async () => {

        this.idGame = await searchGameInstanceWithEmptyPlayer2();
        // join a existing game 
        if( this.idGame != null ){
            console.log('Game found : id = ' + this.idGame);
            await subscribeInAGame('player2',this.idGame, this.idUser)
            // joiner 
            this.placePlayerInDatabase = '2';
        }
        // if game is not found, create game instance and wait a player2
        else{
            await createGameInstance(this.idUser);
            this.idGame = localStorage.getItem("gameId");
            console.log('Game was created : ' + this.idGame);
            // host
            this.placePlayerInDatabase = '1';
        }      
        
        db.listen("GameInstance", this.idGame, (gameReturn) => {
            if (this.state.gameFound != 1){
                this.setState({ gameFound : 1 });
            } 
            else {
                // in game 
                if (gameReturn.attributes.P1CurrentChoice != null && gameReturn.attributes.P2CurrentChoice != null){
                    this.majView(gameReturn);
                }

                //let result = this.MakeSet();
                //this.updateGame(result);
                //this.redirectGame();

            }
        }).then((success) => { console.log("subscribe status ") }, (error) => { console.log(error.message)});      
    }

    // Refresh all states in a game  // executed in a listen function
    majView = (gameReturn) => {
        let { visibilityUserCard, visibilityEnemyCard, cardToDisplayEnemy,textSet, cardToDisplayUser, colorSet1, colorSet2, colorSet3, gameFound, enemyCurrentChoice, userCurrentChoice, visibilityNextSetButton } = this.state;

        if(this.placePlayerInDatabase == '1'){
            enemyCurrentChoice = gameReturn.attributes.P2CurrentChoice;
            userCurrentChoice = gameReturn.attributes.P1CurrentChoice;
            cardToDisplayEnemy = gameReturn.attributes.P2CurrentChoice;
            cardToDisplayUser = gameReturn.attributes.P1CurrentChoice;
            visibilityEnemyCard = 0;
            visibilityUserCard = 1;
            textSet = 'Manche en cours';
            //visibilityNextSetButton = 0;
        }
        else{
            enemyCurrentChoice = gameReturn.attributes.P1CurrentChoice;
            userCurrentChoice = gameReturn.attributes.P2CurrentChoice;
            cardToDisplayEnemy = gameReturn.attributes.P1CurrentChoice;
            cardToDisplayUser = gameReturn.attributes.P2CurrentChoice;
            visibilityEnemyCard = 0;
            visibilityUserCard = 1;
            textSet = 'Manche en cours';
            //visibilityNextSetButton = 0;
        }

        this.setState({
            enemyCurrentChoice : enemyCurrentChoice,
            userCurrentChoice : userCurrentChoice,
            cardToDisplayEnemy : cardToDisplayEnemy,
            cardToDisplayUser : cardToDisplayUser,
            visibilityEnemyCard : visibilityEnemyCard,
            visibilityUserCard : visibilityUserCard,
            visibilityNextSetButton : 0,
            textSet : 'Manche en cours' ,

        });

        
        // IF all players has played
        if(enemyCurrentChoice != '0' && userCurrentChoice != '0' ){
            console.log('makeSet in progress');
            this.MakeSet();
            this.setState({
                visibilityCards : 0,
                visibilityNextSetButton : 1,
                visibilityEnemyCard : 1,
                visibilityUserCard : 1,
                textSet : 'Manche terminée',
            });
            // for endGame 
            this.redirectGame();
        }

        return ; 
    }

    selectCard = async (userChoice) => {
        var query = new Parse.Query('GameInstance');
        query.equalTo("id", this.idGame);
        game = await db.get('GameInstance', this.idGame );

        if(this.placePlayerInDatabase == '1'){
            game.set('P1CurrentChoice', userChoice);
            await game.save();
        }
        else if(this.placePlayerInDatabase == '2'){
            game.set('P2CurrentChoice', userChoice);
            await game.save();
        }
    }

    MakeSet = () => {

        let result = null;
        console.log('device' + this.placePlayerInDatabase + ' => set:' + this.currentSet + '---------- & player2 choice: ' + this.state.enemyCurrentChoice);
        console.log('device' + this.placePlayerInDatabase + ' => set:' + this.currentSet + '---------- & user choice: ' + this.state.userCurrentChoice);

            if (this.state.enemyCurrentChoice == this.state.userCurrentChoice){  result = "null";  this.currentSet = this.currentSet -1; }
            else if (this.state.enemyCurrentChoice == "pierre" && this.state.userCurrentChoice == "feuille"){ result = "Gagné";}
            else if (this.state.enemyCurrentChoice == "pierre" && this.state.userCurrentChoice == "ciseau"){ result = "Perdu";}
            else if (this.state.enemyCurrentChoice == "feuille" && this.state.userCurrentChoice == "ciseau"){ result = "Gagné";}
            else if (this.state.enemyCurrentChoice == "feuille" && this.state.userCurrentChoice == "pierre"){ result = "Perdu";}
            else if (this.state.enemyCurrentChoice == "ciseau" && this.state.userCurrentChoice == "pierre"){ result = "Gagné";}
            else if (this.state.enemyCurrentChoice == "ciseau" && this.state.userCurrentChoice == "feuille"){ result = "Perdu";}
        //} 
        console.log('result : ' + result);
        console.log(result);
        this.updateGame(result) ;
    }

    updateGame = (result) => {

        this.setState({
            visibilityUserCard: 1,
            visibilityEnemyCard: 1,
        });

        if(result == "null"){}
        else if (result == "Gagné"){
            if (this.currentSet == 1) { this.setState({colorSet1 : 'green'}); this.pointUser = this.pointUser + 1; };
            if (this.currentSet == 2) { this.setState({colorSet2 : 'green'}); this.pointUser = this.pointUser + 1; };
            if (this.currentSet == 3) { this.setState({colorSet3 : 'green'}); this.pointUser = this.pointUser + 1; };
        }
        else if (result == "Perdu"){
            if (this.currentSet == 1) { this.setState({colorSet1 : 'red'}); this.pointPlayer2 = this.pointPlayer2 + 1; };
            if (this.currentSet == 2) { this.setState({colorSet2 : 'red'}); this.pointPlayer2 = this.pointPlayer2 + 1;};
            if (this.currentSet == 3) { this.setState({colorSet3 : 'red'}); this.pointPlayer2 = this.pointPlayer2 + 1;};
        }
        this.setState({
            visibilityUserCard : 1,
        });
    }

    nextSet = async () => {

        this.currentSet = this.currentSet + 1;

        this.setState({
            visibilityUserCard: 0,
            visibilityEnemyCard: 0,
            cardToDisplayUser: null,
            cardToDisplayEnemy: null,
            enemyCurrentChoice : null,
            userCurrentChoice : null,
            visibilityUserCard : 0,

            visibilityCards : 1,
            visibilityNextSetButton : 0,
            textSet : 'Manche en cours' ,
        });

        game = await db.get('GameInstance', this.idGame );
        game.set('P2CurrentChoice', null);
        game.set('P1CurrentChoice', null);
        await game.save();
    }

    redirectGame =  () => {
        let navigation = this.props.navigation;

        if(this.placePlayerInDatabase == '1'){
            if (this.currentSet >= 3 && this.pointPlayer2 >= 2 ){
                    navigation.navigate('EndGame',{ result: ['Défaite'] });
            }
            else if (this.currentSet >= 3 && this.pointUser >= 2){
                    navigation.navigate('EndGame',{ result: ['Victoire'] });
            }
        }
        else if(this.placePlayerInDatabase == '2'){
            if (this.currentSet >= 3 && this.pointUser >= 2 ){
                    navigation.navigate('EndGame',{ result: ['Victoire'] });
            }
            else if (this.currentSet >= 3 && this.pointPlayer2 >= 2){
                    navigation.navigate('EndGame',{ result: ['Défaite'] });
            }
        }
    }
    render = () => {
        const { visibilityUserCard, visibilityEnemyCard, cardToDisplayEnemy, cardToDisplayUser, colorSet1, colorSet2, colorSet3, gameFound, textSet, visibilityNextSetButton, visibilityCards } = this.state;

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
                                <Text style={styles.BattleText}>{textSet}</Text>
                                {/*<Button onpress={this.ManualPlayer2Choice()} title="Make Enemy Choice" ><Text>Make Enemy Choice</Text> </Button>*/}
                                <CircleScore colorSet1={colorSet1} colorSet2={colorSet2} colorSet3={colorSet3} />
                            </View>
                            <View style={[styles.containerUserCardPlayed, { opacity: visibilityUserCard } ]}>
                                <Image source={Img[cardToDisplayUser]} resizeMode="contain" style={styles.CardPlayedUser} />
                                {/*<CardPlayed icon={Img[cardToDisplayUser]} texture={Img.carteBois} ></CardPlayed>*/}
                            </View>

                            <View style={[styles.nextSet, { opacity: visibilityNextSetButton } ]}>
                                <TouchableOpacity onPress={() => this.nextSet()} >
                                    <Text> Passer a la manche suivante </Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.setText}> Coup n°{ this.currentSet } </Text>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', opacity: visibilityCards }}>
                                <Card onPress={() => this.selectCard("ciseau")} icon={Img.ciseau} texture={Img.carteBois} color="rgba(191,44,44,1)"/>
                                <Card onPress={() => this.selectCard("feuille")} icon={Img.feuille} texture={Img.carteBois} color="rgba(242,203,5,1)"/>
                                <Card onPress={() => this.selectCard("pierre")} icon={Img.pierre} texture={Img.carteBois} color="rgba(74,140,91,1)"/>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    nextSet:{
        backgroundColor: 'yellow',
        padding: 12,
        fontSize:9,
        margin: 6,
    },
    centerTextMin:{
        marginTop: 30,
        justifyContent: 'center',
        fontSize: 25,
        marginLeft:150,
        fontWeight: 'bold',
    },
    centerText:{
        marginTop: 240,
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
        marginBottom: 0,
    },
    CardPlayedEnemy: {
        width: 80,
        height: 55,
        marginTop: -110,
        marginBottom: 60,

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
            { translateY: -65 }
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
        marginBottom: 5,
    }
});