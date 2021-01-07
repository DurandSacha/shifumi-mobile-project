import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet , Image, TouchableOpacity, ImageBackground } from 'react-native';
//import Configuration from "./components/Configuration";
import Img from '../assets/images/_image';

const br = `\n`;

export default class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSet : 0,
            maxSet : 3,
            MachineChoice: '',
            colorSet1: 'grey',
            colorSet2: 'grey',
            colorSet3: 'grey',
            visibilityEnemyCard : 0,
            visibilityUserCard : 0,
            cardToDisplayUser : 'feuille',
            cardToDisplayEnemy : 'feuille',
        };

        this.opacityIcon = 0;
        this.currentSet = 0;
        this.MakeSet = this.MakeSet.bind(this);
    }

    makeMachineChoice = () => {
        const choice = ['Feuille', 'Ciseaux', 'Pierre']
        const random = Math.floor(Math.random() * choice.length);
        this.state = { MachineChoice: choice[random] };
        return choice[random];
    }

    updateGame = (result) => {

        console.log('Update : ' + result );
        var currentSet = this.currentSet;
        //if (currentSet > 3){ currentSet = currentSet - 1}

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
                currentSet == currentSet + 10
            }
            else if(result == "null"){}
            else{
                this.setState({colorSet3: 'red'});
            }
            return 0;
        }

        if (currentSet >= 3){
            console.log(this.props);
            // navigation.push('Configuration') ;
            //const { navigate } = this.props.navigation; 
            //navigate('Configuration');

            this.props.navigation.navigate('Configuration');

            //const { navigate } = this.props.navigation; navigate('Home')
            //this.props.navigation.navigate('Home')
            console.log('Game Finished');



            //TODO: Finish game if set = 3 and decide who is winner (who have 2 set ) (06/01)
            //TODO: Redirection to resume menu
            // this.outGame();
            //TODO: Refactoring
        }
    }

    // And decide Who Win one set
    MakeSet = (userChoice) => {
        
        const MachineChoice = this.makeMachineChoice() ;
        this.opacityIcon = 1;
        this.setState({
            visibilityUserCard: 1,
            visibilityEnemyCard: 1,
            cardToDisplayUser: userChoice,
            cardToDisplayEnemy: MachineChoice,
        });
        this.forceUpdate();

        if (MachineChoice == userChoice){  var result = "null";  this.currentSet = this.currentSet -1;}
        else if (MachineChoice == "Pierre" && userChoice == "Feuille"){var result = "Gagné";}
        else if (MachineChoice == "Pierre" && userChoice == "Ciseaux"){var result = "Perdu";}
        else if (MachineChoice == "Feuille" && userChoice == "Ciseaux"){var result = "Gagné";}
        else if (MachineChoice == "Feuille" && userChoice == "Pierre"){var result = "Perdu";}
        else if (MachineChoice == "Ciseaux" && userChoice == "Pierre"){var result = "Gagné";}
        else if (MachineChoice == "Ciseaux" && userChoice == "Feuille"){var result = "Perdu";}

        if (this.currentSet <= 3){
            this.currentSet = this.currentSet + 1;
            this.updateGame(result);
            this.forceUpdate();
        }
        return ;  
    }

    render(){
        console.log('EnemyDisplayCard: ' + this.state.cardToDisplayEnemy + ' & opacity : ' + this.state.visibilityEnemyCard + ' ' + this.opacityIcon);
        console.log('UserDisplayCard: ' + this.state.cardToDisplayUser + ' & opacity : ' + this.state.visibilityUserCard + ' ' + this.opacityIcon);

        return (
            <View style={styles.view}>
                <ImageBackground source={Img.background} style={styles.imageBackground}>
                    <View style={styles.header}>

                        <Image
                            source={Img.dosCarte}
                            resizeMode="contain"
                            style={styles.enemyCard}
                            />
                        
                        {/*************ENEMY CARD PLAYED ************ */} 
                        <View style={[styles.containerEnemyCardPlayed, { opacity: this.opacityIcon   }]}>
                            <Image
                                source={Img[this.state.cardToDisplayEnemy]}
                                resizeMode="contain"
                                style={styles.CardPlayed}
                                />
                        </View>

                        <Text style={styles.BattleText}>Choisissez une carte ( visibilité : {this.state.visibilityUserCard} )</Text>

                        <View style={styles.AroundScoreContainer}>
                            <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet1 }]} ></View>
                            <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet2 }]} ></View>
                            <View style={[ styles.AroundScore,{ backgroundColor: this.state.colorSet3 }]} ></View>
                        </View>

                        {/************* USER CARD PLAYED ************ */}
                        <View style={[styles.containerUserCardPlayed, { opacity: this.state.visibilityUserCard } ]}>
                            <Image
                                source={Img[this.state.cardToDisplayUser]}
                                resizeMode="contain"
                                style={styles.CardPlayed}
                                />
                        </View>

                        {/*************  CHOOSE A CARD ********************/}
                        <Text style={styles.setText}> Manche {this.currentSet + 1} </Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                            <View style={styles.container1}>
                                <View style={styles.rect}>
                                <TouchableOpacity onPress={() => this.MakeSet("Ciseaux")}>
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
                                    <TouchableOpacity onPress={() => this.MakeSet("Feuille")}>
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
                                    <TouchableOpacity onPress={() => this.MakeSet("Pierre")}>
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


// this.forceUpdate()