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
  game.set("P1CurrentChoice", '0');
  game.set("P2CurrentChoice", '0');
  game.set("result", null);

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
  query.equalTo("player2", '0');
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
  await game.save();

  return;
}

/*
incrementPointPlayer1 = async (instanceId) => {
  var query = new Parse.Query('GameInstance');
  query.equalTo("id", instanceId);
  game = await db.get('GameInstance', instanceId );
  let point = parseInt( game.attributes.P1Point ) + 1;
  game.set('P1Point', point.toString()  );         //   place : P1Point
  console.log('P1 point ( increment function ) : ' + game.attributes.P1Point);
  game.save();

}

incrementPointPlayer2 = async (instanceId) => {
  var query = new Parse.Query('GameInstance');
  query.equalTo("id", instanceId);
  game = await db.get('GameInstance', instanceId );
  let point = parseInt( game.attributes.P2Point ) + 1;
  game.set('P2Point', point.toString()  );  //   place : P1Point
  console.log('P2 point (increment function)  : ' + game.attributes.P2Point);
  game.save();

}
*/