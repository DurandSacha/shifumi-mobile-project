import * as React from 'react';
import 'react-native-gesture-handler';
import 'localstorage-polyfill';
import Parse from 'parse';

createUserObject = async () => {
  const User = Parse.Object.extend("User");
  const user = new User();
  user.set("player1", "user1");
  user.set("player2", "user2");

  user.save()
  .then(function(user){
    //return user.json();
  })
  .then(function(err){
  })
}