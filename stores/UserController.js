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

/***************** ONE SIGN UP REQUEST WORKING ***************** */
/**** trying to display a data, with a get request, and try to use parse object.... */

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

/***************************************************************************************************************************** */

/****TRYING TO REGISTER GAME INSTANCE WITH PARSE */
/*
const Game = Parse.Object.extend("Game");
const game = new Game();
game.set("player1", "user1");
game.set("player2", "user2");
game.save()
.then((game) => {
  // Execute any logic that should take place after the object is saved.
  console.log('New object created with objectId: ' + game.id);
}, (error) => {
  // Execute any logic that should take place if the save fails.
  // error is a Parse.Error with an error code and message.
  console.log('Failed to create new object, with error code: ' + error.message);
});
*/
/*********************************************** */


/****** GET function ************************* */
/*
const query = new Parse.Query(GameScore);
query.get("xWMyZ4YEGZ")
.then((gameScore) => {
  // The object was retrieved successfully.
}, (error) => {
  // The object was not retrieved successfully.
  // error is a Parse.Error with an error code and message.
});
*/

/**************************************** */