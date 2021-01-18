import 'react-native-gesture-handler';
import 'localstorage-polyfill';
import Parse from 'parse';
import db from '../utils/database';
import 'localstorage-polyfill';

createGameInstance = async (namePlayer1) => {
  const GameInstance = Parse.Object.extend("GameInstance");
  const game = new GameInstance();
  game.set("player1", namePlayer1);
  game.set("player2", '0');

  await game.save()
  .then(function(game){
      localStorage.setItem("gameId", game.id);
      return game.id;
    }, (error) => {
      console.log(error.message);
      return null;
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
  game = await db.get('GameInstance', instanceId );
  game.set(place, name);
  game.save()

  return;
}

/*
listenGamePlayer = async (idGameInstance) => {
  const game = await db.get("GameInstance", idGameInstance);

  let query = new Parse.Query("GameInstance");
  query.equalTo("id", idGameInstance);

  //query.equalTo("player2", null);

  let subscription = await query.subscribe();
  subscription.on('update', () => { console.log('object updated')  });

  return subscription;
  
}
*/



// TODO: scoring function

