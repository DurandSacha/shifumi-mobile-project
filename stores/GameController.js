import 'react-native-gesture-handler';
import 'localstorage-polyfill';
import Parse from 'parse';
import db from '../utils/database';
import 'localstorage-polyfill';
import AsyncStorage from '@react-native-async-storage/async-storage';

createGameInstance = async (namePlayer1) => {
  const GameInstance = Parse.Object.extend("GameInstance");
  const game = new GameInstance();
  game.set("player1", namePlayer1);
  game.set("player2", "user2");

  await game.save()
  .then(function(game){
    localStorage.setItem("gameId", game.id);
    return game;
  })
  .then(function(error){
    console.log(error);
    //return error;
  })
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    //return error;
  });

  //console.log(db.get('GameInstance',localStorage.getItem("gameId") ));
}

searchGameInstanceWithEmptyPlayer2 = (player1) => {
  // query instance game where player2 == null 
  return;
}

JoinGame = () => {
  // join player1 column or player2 column ? 
  return;
}


























/***************** CREATE A GAME INSTANCE  ***************** */
/*
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
*/


/*****************   ***************** */
// Create instance ( publish one game by player1 )
// SearchOneGame ( Get Game instance with empty player 2 column )

// after: relation function for scoring 

