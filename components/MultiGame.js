import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet , Image, TouchableOpacity, ImageBackground} from 'react-native';
import 'react-native-gesture-handler';
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
        };

        this.idGame = null;
        this.pointPlayer2 = 0;
        this.pointUser = 0;
        this.currentSet = 0;
        this.idUser = Math.floor(Math.random() * Math.floor(15000)).toString();
        this.placePlayerInDatabase= null;

    }

    updateGame = async (result, userChoice, Player2Choice) => {     //this.placePlayerInDatabase    // P1Point // P2Point

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
                        //this.pointUser = this.pointUser + 1 ;

                        if(this.placePlayerInDatabase == '1'){await incrementPointPlayer1(this.idGameCreated);}
                        else if(this.placePlayerInDatabase == '2'){await incrementPointPlayer2(this.idGameCreated);}

                        if (currentSet == 1) { this.setState({colorSet1 : 'green'}) };
                        if (currentSet == 2) { this.setState({colorSet2 : 'green'}) };
                        if (currentSet == 3) { this.setState({colorSet3 : 'green'}) };
                    }

                    else{
                        if (currentSet == 1) { this.setState({colorSet1 : 'red'}) };
                        if (currentSet == 2) { this.setState({colorSet2 : 'red'}) };
                        if (currentSet == 3) { this.setState({colorSet3 : 'red'}) };
                        //this.pointPlayer2 = this.pointPlayer2 + 1 ;

                        if(this.placePlayerInDatabase == '1'){await incrementPointPlayer1(this.idGameCreated);}
                        else if(this.placePlayerInDatabase == '2'){await incrementPointPlayer2(this.idGameCreated);}
                    }
                }
            }
            //this.setState({player2Hasplayed : 0});
        }
    }

    makePlayer2Choice = async () => {

        //game = db.get('GameInstance', this.idGameCreated );
        // Get Current Choice for enemy with listening database and return choic in this function
        await db.listenScore("GameInstance", this.idGameCreated, async (game)  => {

            console.log('-------------------------------- LISTEN SCORE PARTS--------------------------------');
             //let game = await db.get('GameInstance', this.idGameCreated );
             console.log(game.P1CurrentChoice);
             
            //game = db.get('GameInstance', this.idGameCreated );
            console.log('attente du choix enemi : ' + game.P1CurrentChoice);
            console.log(game);
            //game = JSON.parse(game);
            console.log(game.P1CurrentChoice);
            console.log('---------------------------------- END LISTEN SCORE-----------------------------------');
             


             //TODO: return player 2 choice ( with placePlayer )
             /*
             if(this.placePlayerInDatabase == '1'){
                // TODO: listening + get P1CurrentChoice
                return game.P1CurrentChoice;
             }
             else if(this.placePlayerInDatabase == '2'){
                 // TODO: listening + get P2CurrentChoice
                console.log(game.P2CurrentChoice);
                return game.P2CurrentChoice;
             }

             console.log('Player 2 has played'); 
             //return 'feuille';
             */
        } );

        /****TEST MANUAL PLAYER 2 CHOICE IN SET  */
        this.ManualPlayer2Choice();
        return 'ciseau';
    }

    /* INSERT CHOICE IN DATABASE FOR OTHER CHOICE SIMULATION */
    ManualPlayer2Choice = async () => {
        //var query = new Parse.Query('GameInstance');
        //query.equalTo("id", this.idGameCreated);
        game = await db.get('GameInstance', this.idGameCreated );

        if(this.placePlayerInDatabase == '1'){
            game.set('P2CurrentChoice', 'ciseau');
            this.state.cardToDisplayEnemy = 'ciseau' ; 
            //this.state.Player2Choice = 'ciseau';
         }
        else if(this.placePlayerInDatabase == '2'){
            game.set('P1CurrentChoice', 'ciseau');
            this.state.cardToDisplayEnemy = 'ciseau' ; 
            //this.state.PlayerUserChoice = 'ciseau';
         }
        game.save()

        return 'ciseau';
    }

    MakeSet = async (userChoice) => {
        //Push user choice in database 

        var query = new Parse.Query('GameInstance');
        query.equalTo("id", this.idGameCreated);
        game = await db.get('GameInstance', this.idGameCreated );

        if(this.placePlayerInDatabase == '1'){
            game.set('P1CurrentChoice', userChoice);
         }
         else if(this.placePlayerInDatabase == '2'){
            game.set('P2CurrentChoice', userChoice);
         }
        game.save()



        let Player2Choice = await this.makePlayer2Choice() ;
        // after player 2 make choice

        let result = null;

        console.log('player2Choice :');
        console.log(Player2Choice);



        if (Player2Choice == userChoice){  result = "null";  this.currentSet = this.currentSet -1;}
        else if (Player2Choice == "pierre" && userChoice == "feuille"){ result = "Gagné";}
        else if (Player2Choice == "pierre" && userChoice == "ciseau"){ result = "Perdu";}
        else if (Player2Choice == "feuille" && userChoice == "ciseau"){ result = "Gagné";}
        else if (Player2Choice == "feuille" && userChoice == "pierre"){ result = "Perdu";}
        else if (Player2Choice == "ciseau" && userChoice == "pierre"){ result = "Gagné";}
        else if (Player2Choice == "ciseau" && userChoice == "feuille"){ result = "Perdu";}
            
        if (this.currentSet <= 3){ this.currentSet = this.currentSet + 1; }
        //result = "Gagné";
        this.updateGame(result,userChoice,Player2Choice);
        console.log('resultat de la manche' + result);
        this.forceUpdate();
        this.redirectGame();
        return 0 ;  
        
    }

    redirectGame = async () => {

        // TODO: Change pointPlayer2 and pointUser for Database data

        let navigation = this.props.navigation;
        if (this.currentSet >= 3 && this.pointPlayer2 >= 2 ){
            setTimeout(function(){
                navigation.navigate('EndGame',{ result: ['Défaite'] });
             }, 700);
        }
        else if (this.currentSet >= 3 && this.pointUser >= 2){
            setTimeout(function(){
                navigation.navigate('EndGame',{ result: ['Victoire'] });
             }, 700);
        }
    }

    //TODO: delete game instance if player is not connected

    componentDidMount(){
        this.searchOtherPlayerAndStartGame();
    }
    componentWillUnmount(){}


    searchOtherPlayerAndStartGame = async () => {

        this.idGame = await searchGameInstanceWithEmptyPlayer2();

        // join a existing game 
        if( this.idGame != null ){
            console.log('Game found : id = ' + this.idGame);
            await subscribeInAGame('player2',this.idGame, this.idUser)
            this.placePlayerInDatabase = '2';
            this.setState({gameFound : 1 });

            return;
        }

        // if game is not found, create game instance and wait a player2
        else{
            await createGameInstance(this.idUser);
            this.idGameCreated = localStorage.getItem("gameId");
            console.log('Game was created : ' + this.idGameCreated);
            //this.startGame();

            db.listenPlayer("GameInstance", this.idGameCreated, () => { if (this.gameFound != 1){this.setState({ gameFound : 1 });} } ) 
            this.placePlayerInDatabase = '1';

            /******   TEST MANUAL UPDATE JOINING PLAYER 2  ******/  
            // TODO: Try tu update database with other device 
            var query = new Parse.Query('GameInstance');
            query.equalTo("id", this.idGameCreated);
            game = await db.get('GameInstance', this.idGameCreated );
            game.set('player2', '1111111');
            game.save()

            return;
        }               

    }

    render = () => {
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
                                {/*<Button onpress={this.ManualPlayer2Choice()} title="Make Enemy Choice" ><Text>Make Enemy Choice</Text> </Button>*/}
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