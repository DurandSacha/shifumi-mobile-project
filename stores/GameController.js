import * as React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from "./components/Game";
import EndGame from "./components/EndGame";
import Configuration from "./components/Configuration";
import 'react-native-gesture-handler';
import Img from './assets/images/_image';
import Buttons from './components/Layout/Buttons';
import 'localstorage-polyfill';
const Parse = require('parse/react-native.js');


Parse.setAsyncStorage(localStorage);
Parse.initialize("0123456789", "0123456789", "0123456789");
Parse.serverURL = 'https://shifumi-game-akarah.herokuapp.com/parse/';

/***************** CREATE A GAME INSTANCE  ***************** */

/*
createUser = async (username, email, password) => {
    let myHeaders = new Headers();
    myHeaders.append("X-Parse-Application-Id", "0123456789");
    myHeaders.append("Content-Type", "application/json");
  
    const user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
  
    var params = { 
      method: 'POST',
      headers: myHeaders,
      body: user,
    }
  
    fetch('https://shifumi-game-akarah.herokuapp.com/parse/classes/User', params).then(function(response) {
      console.log(JSON.stringify(response))
      return JSON.stringify(response);
    })
    .then(function(error) {
      return error
    });
  }
  createUser('sacha8000','sacha888@gmail.com', '000000');
*/


/*****************   ***************** */
// Create instance ( publish one game by player1 )
// SearchOneGame ( Get Game instance with empty player 2 column )

// after: relation function for scoring 

