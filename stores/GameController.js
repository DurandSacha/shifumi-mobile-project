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

  game.set("P1Point", '0');    // string to int :  parseInt()   // int to string : .toString
  game.set("P2Point", '0');
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
  game.save()

  return;
}


// string to int :  parseInt()   // int to string : .toString


incrementPointPlayer1 = async (instanceId) => {
  var query = new Parse.Query('GameInstance');
  query.equalTo("id", instanceId);
  game = await db.get('GameInstance', instanceId );
  console.log('P1 point in increment function : ' + game.P1Point);

  let point = parseInt( game.P1Point + 1 );
  game.set('P1Point', point.toString()  );         //   place : P1Point
  
  game.save()
}

IncrementPointPlayer2 = async () => {
  var query = new Parse.Query('GameInstance');
  query.equalTo("id", instanceId);
  game = await db.get('GameInstance', instanceId );
  console.log('P2 point in increment function : ' + game.P2Point);

  let point = parseInt( game.P2Point + 1 );
  game.set('P2Point', point.toString()  );  //   place : P1Point

  game.save()
}