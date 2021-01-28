import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet , Image, TouchableOpacity, ImageBackground} from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Img from '../assets/images/_image';
import CircleScore from './Layout/CircleScore';
import Card from './Layout/Card';
import Buttons from './Layout/Buttons';
import '../stores/GameController';
import '../stores/UserController';
import 'localstorage-polyfill';
import Parse from 'parse';
import db from '../utils/database';


const br = `\n`;

export default class MultiPlayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameFound : 0,  //Replace this to 0 for search Player View 
            maxSet : 3,
            PlayerUserChoice: '',
            Player2Choice: '',
            colorSet1: 'rgb(165,165,165)',
            colorSet2: 'rgb(165,165,165)',
            colorSet3: 'rgb(165,165,165)',
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
            timeoutSearchGame : 10
        };

        this.idGame = null;
        this.pointPlayer2 = 0;
        this.pointUser = 0;
        this.currentSet = 1;
        this.result = '0';
        this.idUser = Math.floor(Math.random() * Math.floor(15000)).toString();
        this.placePlayerInDatabase= null;

        //this.timeoutForSearchGame();

    }

    async componentWillUnmount(){
            game =  await db.get('GameInstance', this.idGame );
            game.destroy().then((object) => { console.log('Clean Database ( ComponentWillUnmount ) '); }, (error) => {/*console.log(error.message); */ });

            // clean interval
            clearInterval(this.clockCall);
    }

    componentDidMount(){
        //Search Other Game 
        this.searchOtherPlayerAndInitializeGame();

        //Set interval for maximum time of search game 
        this.clockCall = setInterval(() => {
            this.setState((prevstate) => ({ timeoutSearchGame : prevstate.timeoutSearchGame-1 }));
        }, 1000);
        
        
    }

    // SearchGame // create Game // listen database 
    searchOtherPlayerAndInitializeGame = async () => {

        this.idGame = await searchGameInstanceWithEmptyPlayer2();
        // join a existing game 
        if( this.idGame != null ){
            console.log('Game found : id = ' + this.idGame);
            await subscribeInAGame('player2',this.idGame, this.idUser)
            // joiner 
            this.setState({ gameFound : 1 });
            clearInterval(this.clockCall);
            this.placePlayerInDatabase = '2';
        }
        // if game is not found, create game instance and wait a player2
        else{
            await createGameInstance(this.idUser);
            this.idGame = localStorage.getItem("gameId");
            console.log('Game was created : ' + this.idGame);
            //this.timeoutForSearchGame();
            // host
            this.placePlayerInDatabase = '1';
        }      
        
        db.listen("GameInstance", this.idGame, (gameReturn) => {
            if (/*gameReturn.attributes.player1 != '0' && gameReturn.attributes.player2 != '0' || */ this.state.gameFound != 1){
                this.setState({ gameFound : 1 });
                clearInterval(this.clockCall);
            } 
            else {
                // in game 
                if (gameReturn.attributes.P1CurrentChoice != null && gameReturn.attributes.P2CurrentChoice != null){
                    this.majView(gameReturn);
                }
            }
        }).then((success) => { console.log("subscribe status ") }, (error) => { console.log(error.message)});      
    }

    // Refresh all states in a game  // executed in a listen function
    majView = (gameReturn) => {

        let { visibilityUserCard, visibilityEnemyCard, cardToDisplayEnemy,textSet, cardToDisplayUser, visibilityNextSetButton, 
            colorSet1, colorSet2, colorSet3, gameFound, enemyCurrentChoice, userCurrentChoice 
        } = this.state;

        if(this.placePlayerInDatabase == '1'){
            enemyCurrentChoice = gameReturn.attributes.P2CurrentChoice;
            userCurrentChoice = gameReturn.attributes.P1CurrentChoice;
            cardToDisplayEnemy = gameReturn.attributes.P2CurrentChoice;
            cardToDisplayUser = gameReturn.attributes.P1CurrentChoice;
        }
        else{
            enemyCurrentChoice = gameReturn.attributes.P1CurrentChoice;
            userCurrentChoice = gameReturn.attributes.P2CurrentChoice;
            cardToDisplayEnemy = gameReturn.attributes.P1CurrentChoice;
            cardToDisplayUser = gameReturn.attributes.P2CurrentChoice;
        }

        visibilityEnemyCard = 0;
        visibilityUserCard = 1;
        visibilityNextSetButton = 0;
        textSet = 'Manche en cours';

        this.setState({
            enemyCurrentChoice : enemyCurrentChoice,
            userCurrentChoice : userCurrentChoice,
            cardToDisplayEnemy : cardToDisplayEnemy,
            cardToDisplayUser : cardToDisplayUser,
            visibilityEnemyCard : visibilityEnemyCard,
            visibilityUserCard : visibilityUserCard,
            visibilityNextSetButton : visibilityNextSetButton,
            textSet : textSet ,

        });
        
        // IF all players has played
        if(enemyCurrentChoice != '0' && userCurrentChoice != '0' ){
            this.MakeSet();
            this.setState({
                visibilityCards : 0,
                visibilityNextSetButton : 1,
                visibilityEnemyCard : 1,
                visibilityUserCard : 1,
                textSet : 'Manche terminée',
            });
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
        this.result = '0';
        if (this.state.enemyCurrentChoice == this.state.userCurrentChoice){  result = "null"; this.result = 'null'; }
        else if (this.state.enemyCurrentChoice == "pierre" && this.state.userCurrentChoice == "feuille"){ result = "Gagné"; }
        else if (this.state.enemyCurrentChoice == "pierre" && this.state.userCurrentChoice == "ciseau"){ result = "Perdu"; }
        else if (this.state.enemyCurrentChoice == "feuille" && this.state.userCurrentChoice == "ciseau"){ result = "Gagné"; }
        else if (this.state.enemyCurrentChoice == "feuille" && this.state.userCurrentChoice == "pierre"){ result = "Perdu"; }
        else if (this.state.enemyCurrentChoice == "ciseau" && this.state.userCurrentChoice == "pierre"){ result = "Gagné"; }
        else if (this.state.enemyCurrentChoice == "ciseau" && this.state.userCurrentChoice == "feuille"){ result = "Perdu"; }

        this.updateGame(result) ;
    }

    updateGame = (result) => {

        this.setState({
            visibilityUserCard: 1,
            visibilityEnemyCard: 1,
        });

        this.result = "0";
        
        if (result == "Gagné"){
            if (this.currentSet == 1) { this.setState({colorSet1 : 'rgb(106,206,0)'}); this.pointUser = this.pointUser + 1; };
            if (this.currentSet == 2) { this.setState({colorSet2 : 'rgb(106,206,0)'}); this.pointUser = this.pointUser + 1; };
            if (this.currentSet == 3) { this.setState({colorSet3 : 'rgb(106,206,0)'}); this.pointUser = this.pointUser + 1; };
        }
        else if (result == "Perdu"){
            if (this.currentSet == 1) { this.setState({colorSet1 : 'red'}); this.pointPlayer2 = this.pointPlayer2 + 1; };
            if (this.currentSet == 2) { this.setState({colorSet2 : 'red'}); this.pointPlayer2 = this.pointPlayer2 + 1; };
            if (this.currentSet == 3) { this.setState({colorSet3 : 'red'}); this.pointPlayer2 = this.pointPlayer2 + 1; };
        }
        this.setState({
            visibilityUserCard : 1,
        });
    }

    nextSet = async () => {

        if(this.state.enemyCurrentChoice == this.state.userCurrentChoice){
            this.result = "null" ;
        }
        if(this.result != "null"){
            this.currentSet = this.currentSet + 1;
        }

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
                setTimeout(function(){navigation.navigate('EndGame',{ result: ['Défaite'] })}, 700);
            }
            else if (this.currentSet >= 3 && this.pointUser >= 2){
                setTimeout(function(){navigation.navigate('EndGame',{ result: ['Victoire'] })}, 700);
            }
        }
        else if(this.placePlayerInDatabase == '2'){
            if (this.currentSet >= 3 && this.pointUser >= 2 ){
                setTimeout(function(){navigation.navigate('EndGame',{ result: ['Victoire'] })}, 700);
            }
            else if (this.currentSet >= 3 && this.pointPlayer2 >= 2){
                setTimeout(function(){navigation.navigate('EndGame',{ result: ['Défaite'] })}, 700);
            }
        }
    }
    render = () => {
        const { visibilityUserCard, visibilityEnemyCard, cardToDisplayEnemy, cardToDisplayUser, colorSet1, colorSet2, colorSet3, gameFound, textSet, 
            visibilityNextSetButton, visibilityCards, timeoutSearchGame } = this.state;

        //this.timeoutForSearchGame();

        if(gameFound == 0 && timeoutSearchGame > 0){
            return(
                <View style={{flex:1}}>
                     <ImageBackground source={Img.background} style={styles.imageBackground}>
                    
                     <View style={{flex:3, justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                        <Text style={styles.centerText}>Recherche d'adversaire</Text>
                    </View>
                    <View style={{flex:3, justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                        <Text style={[{}, styles.centerTextMin]}>Patientez...</Text>
                    </View>
                    <View style={{flex:4, justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                    <Text style={[{}, styles.centerTextTimeout]}> Temps restant : {timeoutSearchGame} secondes</Text>
                    </View>
                    </ImageBackground>
                </View>
            )
        }   
        else if (gameFound == 0 && timeoutSearchGame <= 0){
            return(
                <View style={{flex:1}}>
                    <ImageBackground source={Img.background} style={styles.imageBackground}>
                        <View style={{flex:3, justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                            <Text style={styles.centerText}>Recherche d'adversaire terminé</Text>
                        </View>
                        <View style={{flex:4, justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                            <Text style={[{}, styles.centerTextTimeout]}> Malheureusement, nous ne trouvons pas de joueur, veuillez essayez plus tard </Text>
                        </View>

                        <View style={{flex:4, justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                            <Buttons buttonText="Menu" navigation={this.props.navigation} NameRenderView="Home" texture={Img.bois} />
                        </View>
                    </ImageBackground>
                </View>
           )
        }
        else if(gameFound == 1){
            return (
                <View style={styles.view}>
                    <ImageBackground source={Img.background} style={styles.imageBackground}>
                        <View style={[{flex:1 ,justifyContent:'center'}, styles.header]}>


                            <View style={{flex:4}}>
                                <Image source={Img.dosCarte} resizeMode="contain" style={styles.enemyCard}/>
                            </View>


                            <View style={[styles.containerEnemyCardPlayed, { opacity: visibilityEnemyCard, flex:4  }]}>
                                <Image source={Img[cardToDisplayEnemy]} resizeMode="contain" style={styles.CardPlayedEnemy} />
                            </View>

                            <View style={{flex:3 ,justifyContent:'center'}}>
                                <Text style={styles.BattleText}>{textSet}</Text>
                                <CircleScore colorSet1={colorSet1} colorSet2={colorSet2} colorSet3={colorSet3} />
                            </View>

                            <View style={[styles.containerUserCardPlayed, { opacity: visibilityUserCard, flex:4 ,justifyContent:'center' } ]}>
                                <Image source={Img[cardToDisplayUser]} resizeMode="contain" style={styles.CardPlayedUser} />
                            </View>

                            <View style={[styles.nextSet, { flex:1 , opacity: visibilityNextSetButton} ]}>
                                <TouchableOpacity onPress={() => this.nextSet()} >
                                    <Text> Passer a la manche suivante </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{flex:1, justifyContent: 'center'}}>
                                <Text style={styles.setText}> Coup n°{ this.currentSet } </Text>
                            </View>

                            <View style={{flex:5, justifyContent: 'center'}}>
                                <View style={[styles.ContainerChoiceUserCards , {flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', opacity: visibilityCards }]}>
                                    <Card onPress={() => this.selectCard("ciseau")} icon={Img.ciseau} texture={Img.carteBois} color="rgba(191,44,44,1)"/>
                                    <Card onPress={() => this.selectCard("feuille")} icon={Img.feuille} texture={Img.carteBois} color="rgba(242,203,5,1)"/>
                                    <Card onPress={() => this.selectCard("pierre")} icon={Img.pierre} texture={Img.carteBois} color="rgba(74,140,91,1)"/>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    centerTextTimeout :{
        fontSize:15,
        color: 'rgb(240,240,240)',
        paddingLeft: 60,
        paddingRight: 60,
    },
    ContainerChoiceUserCards:{
        //marginBottom: 220,
    },
    nextSet:{
        backgroundColor: 'yellow',
        padding: 8,
        fontSize:9,
        margin: 6,
        alignItems: 'center',
    },
    centerTextMin:{
        marginTop: 30,
        //justifyContent: 'center',
        fontSize: 20,
        //marginLeft:150,
        fontWeight: 'bold',
        color:'white',
    },
    centerText:{
        marginTop: 240,
        //justifyContent: 'center',
        fontSize: 25,
        //marginLeft:50,
        fontWeight: 'bold',
        color:'white',
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
        //marginTop: 150,
        //marginBottom: 0,
    },
    CardPlayedEnemy: {
        width: 90,
        height: 60,
        //marginTop: -110,
        //marginBottom: 60,

    },
    containerEnemyCardPlayed: {
        transform: [
            { rotate: "90deg" },
            //{ translateX: -130 },
            { translateY: 45 }
        ],
    },
    containerUserCardPlayed: {
        transform: [
            { rotate: "-90deg" },
            //{ translateX: 0 },
            //{ translateY: -75 }
        ],
    },
    BattleText: {
        fontSize: 17,
        marginTop: 0,
        fontWeight: "bold",
        color: 'white',
    },
    setText:{
        fontSize: 15,
        marginBottom:15,
        color: 'rgb(50,50,50)',  
    }
});