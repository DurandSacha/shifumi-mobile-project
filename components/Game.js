import React, { Component } from 'react';
import { View, Text, StyleSheet , Image, ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import Img from '../assets/images/_image';
import CircleScore from './Layout/CircleScore';
import Card from './Layout/Card';
import CardPlayed from './Layout/CardPlayed';
import {widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import 'localstorage-polyfill';

const br = `\n`;

export default class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maxSet : 3,
            MachineChoice: '',
            colorSet1: 'rgb(165,165,165)',
            colorSet2: 'rgb(165,165,165)',
            colorSet3: 'rgb(165,165,165)',
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

        let i = 0
        while (i <= 3) {
            i = i + 1;
            if (currentSet == i){
                if(result == "null"){}
                else if (result == "Gagné"){
                    this.pointUser = this.pointUser + 1 ;
                    if (currentSet == 1) { this.setState({colorSet1 : 'rgb(106,206,0)'}) };
                    if (currentSet == 2) { this.setState({colorSet2 : 'rgb(106,206,0)'}) };
                    if (currentSet == 3) { this.setState({colorSet3 : 'rgb(106,206,0)'}) };
                }
                else{
                    if (currentSet == 1) { this.setState({colorSet1 : 'red'}) };
                    if (currentSet == 2) { this.setState({colorSet2 : 'red'}) };
                    if (currentSet == 3) { this.setState({colorSet3 : 'red'}) };
                    this.pointMachine = this.pointMachine + 1 ;
                }
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
        this.forceUpdate();
        this.redirectGame();
        return ;  
    }

    redirectGame = () => {
        let navigation = this.props.navigation;
        if (this.currentSet >= 3 && this.pointMachine >= 2 ){
            setTimeout(function(){
                let terminated = localStorage.getItem('terminated');
                localStorage.setItem('terminated', parseInt(terminated) + parseInt(1) );
                navigation.navigate('EndGame',{ result: ['Défaite'] });
             }, 700);
        }
        else if (this.currentSet >= 3 && this.pointUser >= 2){
            setTimeout(function(){
                let terminated = localStorage.getItem('terminated');
                localStorage.setItem('terminated', parseInt(terminated) + parseInt(1) );
                navigation.navigate('EndGame',{ result: ['Victoire'] });
             }, 700);
        }
    }

    render =() => {

        const { visibilityUserCard, visibilityEnemyCard, cardToDisplayEnemy, cardToDisplayUser, colorSet1, colorSet2, colorSet3 } = this.state;

        return (
            <View style={styles.view}>
                <ImageBackground source={Img.background} style={styles.imageBackground}>
                <View style={[{flex:1 ,justifyContent:'center'}, styles.header]}>

                    <View style={{flex:4}}>
                        <Image source={Img.dosCarte} resizeMode="contain" style={styles.enemyCard}/>
                    </View>

                        <View style={[styles.containerEnemyCardPlayed, { flex:4, opacity: visibilityEnemyCard   }]}>
                            <CardPlayed icon={Img[cardToDisplayEnemy]} texture={Img.carteBois} ></CardPlayed>
                        </View>

                        <View style={{flex:3 ,justifyContent:'center'}}>
                            <Text style={styles.BattleText}>Choisissez une carte</Text>
                            <CircleScore colorSet1={colorSet1} colorSet2={colorSet2} colorSet3={colorSet3} />
                        </View>

                        <View style={[styles.containerUserCardPlayed, { flex:4 ,justifyContent:'center', opacity: visibilityUserCard } ]}>
                            <CardPlayed icon={Img[cardToDisplayUser]} texture={Img.carteBois} ></CardPlayed>
                        </View>

                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={styles.setText}> Coup n°{ this.currentSet } </Text>
                        </View>

                        <View style={{flex:5, justifyContent: 'center'}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                                <Card onPress={() => this.MakeSet("ciseau")} icon={Img.ciseau} texture={Img.carteBois} color="rgba(191,44,44,1)"/>
                                <Card onPress={() => this.MakeSet("feuille")} icon={Img.feuille} texture={Img.carteBois} color="rgba(242,203,5,1)"/>
                                <Card onPress={() => this.MakeSet("pierre")} icon={Img.pierre} texture={Img.carteBois} color="rgba(74,140,91,1)"/>
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
        //marginTop:2,
        //padding: 2,
    },
    imageBackground: {
        flex: 4,
        width: widthPercentageToDP('100%'),
        height : heightPercentageToDP('100%'),
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
        borderRadius: 0,
        borderWidth: 2,
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
        width: 1400,
        height: 280,
    },
    CardPlayedUser: {
        width: 90,
        height: 60,
        //marginTop: 70,
        //marginBottom: 10,
    },
    CardPlayedEnemy: {
        width: 80,
        height: 55,
        //marginTop: -0,
        //marginBottom: 20,

    },
    containerEnemyCardPlayed: {
        transform: [
            { rotate: "90deg" },
            { translateX: -90 },
            { translateY: -1 }
        ],
    },
    containerUserCardPlayed: {
        transform: [
            { rotate: "-90deg" },
            { translateX: 0 },
            { translateY: 0 }
        ],
    },
    BattleText: {
        fontSize: 17,
        //marginTop: -45,
        fontWeight: "bold",
        marginLeft: 75,
        color:'white',
    },
    setText:{
        fontSize: 15,
        marginBottom: 10,
        color:'white',
    }
});