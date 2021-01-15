import 'react-native-gesture-handler';
import 'localstorage-polyfill';
import Parse from 'parse';
import db from '../utils/database';
import 'localstorage-polyfill';

createGameInstance = async (namePlayer1) => {
  const GameInstance = Parse.Object.extend("GameInstance");
  const game = new GameInstance();
  game.set("player1", namePlayer1);
  game.set("player2", null);

  await game.save()
  .then(function(game){
    localStorage.setItem("gameId", game.id);
  })
  .then(function(error){
    console.log('error: ' + error);
  })
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  });
}

searchGameInstanceWithEmptyPlayer2 = async () => {
  // query instance game where player2 == null 
  var query = new Parse.Query('GameInstance');
  query.equalTo("player2", null);
  games = await query.find();

  if(games.length == 0)
  {
    return null;
  } 
  else{ 
    return games[0]['id'];
  }

}

subscribeInAGame = async (place,instanceId,name) => {

  var query = new Parse.Query('GameInstance');
  query.equalTo("id", instanceId);
  game = await query.first();

  //console.log(game);

  /*
  game.save()
  .then((game) => {
    game.increment(place, name);
    return game.save();
  });
  */


  //game.increment(place, name);
  //game.set(place, name);
  //game.save()

  //console.log(game);

  /*
  query.first({
    success: function(gameInstance) {
      gameInstance.set(place, name);
      gameInstance.save()
    */
  return;
}

// TODO: scoring function

