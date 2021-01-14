import * as React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import 'localstorage-polyfill';
const Parse = require('parse/react-native.js');


Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("0123456789", "0123456789", "0123456789");
Parse.serverURL = 'https://shifumi-game-akarah.herokuapp.com/parse/';

/***************** CREATE A GAME INSTANCE  ***************** */

createGameInstance = async (player1name) => {
    player1name = "michel";
    let myHeaders = new Headers();
    myHeaders.append("X-Parse-Application-Id", "0123456789");
    myHeaders.append("Content-Type", "application/json");
  

    const GameInstance = Parse.Object.extend("GameInstance");
    const gameInstance = new GameInstance();
    
    //const gameInstance = new Parse.GameInstance();
    gameInstance.set("player1", player1name);
  
    var params = { 
      method: 'POST',
      headers: myHeaders,
      body: gameInstance,
    }
  
    fetch('https://shifumi-game-akarah.herokuapp.com/parse/classes/GameInstance', params).then(function(response) {
      console.log(JSON.stringify(response))
      return JSON.stringify(response);
    })
    .then(function(error) {
      return error
    });
  }
  // TODO: Use only Parse
  // TODO: Get Id of GameInstance 
  // TODO: Get information from gameinstance ( player1,... empty ? ) 
  // TODO: place a name of player1



/*****************   ***************** */
// Create instance ( publish one game by player1 )
// SearchOneGame ( Get Game instance with empty player 2 column )

// after: relation function for scoring 

