import * as React from 'react';
import 'react-native-gesture-handler';
import 'localstorage-polyfill';
import Parse from 'parse';

createUserObject = async () => {
  const User = Parse.Object.extend("User");
  const user = new User();
  user.set("player1", "user1");
  user.set("player2", "user2");

  console.log(user);

  user.save()
  .then(function(user){
    console.log(user.id);
    return user.json();
  })
  .then(function(err){
    console.log(err);
  })
  /*
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    throw error;
  });
  //game.saveInBackground();
  */

}