
// In a node.js environment
const Parse = require('parse/node');
// ES6 Minimized
import Parse from 'parse/dist/parse.min.js';

// In a React Native application
//const Parse = require('parse/react-native.js');


//Get your favorite AsyncStorage handler with import (ES6) or require
import { AsyncStorage } from 'react-native'; 

//Before using the SDK...
Parse.setAsyncStorage(AsyncStorage);



// Cloud Code entry point
Parse.initialize("123456789", "123456789", "123456789");
//javascriptKey is required only if you have it on server.

Parse.serverURL = 'http://YOUR_PARSE_SERVER:1337/parse'


const GameScore = Parse.Object.extend("GameScore");
const gameScore = new GameScore();

gameScore.set("score", 1337);
gameScore.set("playerName", "Sean Plott");
gameScore.set("cheatMode", false);

gameScore.save()
.then((gameScore) => {
  // Execute any logic that should take place after the object is saved.
  alert('New object created with objectId: ' + gameScore.id);
}, (error) => {
  // Execute any logic that should take place if the save fails.
  // error is a Parse.Error with an error code and message.
  alert('Failed to create new object, with error code: ' + error.message);
});