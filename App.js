import * as React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from "./components/Game";
import MultiGame from "./components/MultiGame";
import EndGame from "./components/EndGame";
import Configuration from "./components/Configuration";
import 'react-native-gesture-handler';
import Img from './assets/images/_image';
import Buttons from './components/Layout/Buttons';
import 'localstorage-polyfill';
import AsyncStorage from '@react-native-async-storage/async-storage';
// or import AsyncStorage from '@react-native-community/async-storage';
import Parse from 'parse';

/*
Back end (Parse Server) is available and deployed with : https://github.com/DurandSacha/parse-server-example at https://shifumi-game-akarah.herokuapp.com/parse/function/hello
- Heroku app with connected github
- MongoDB is configured with : https://cloud.mongodb.com/v2 
*/

//Parse.setAsyncStorage(localStorage);
Parse.setAsyncStorage(AsyncStorage);

Parse.initialize("0123456789", "0123456789", "0123456789");
Parse.serverURL = 'https://shifumi-game-akarah.herokuapp.com/parse/'; 


/****TRYING TO REGISTER GAME INSTANCE WITH PARSE only */
/* TODO: See this with akarah ********************/ 


createGameObject = async () => {
  const GameInstance = Parse.Object.extend("GameInstance");
  const game = new GameInstance();
  game.set("player1", "user1");
  game.set("player2", "user2");

  console.log(game);

  game.save()
  .then(function(game){
    console.log(game.id);
    return game.json();
  })
  .then(function(err){
    console.log(err);
  })
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    throw error;
  });
  //game.saveInBackground();

}
//createGameObject();

/*********************************************** */

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
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    throw error;
  });
  //game.saveInBackground();

}





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
    //console.log(response.get("username"));
    console.log(response.id);
    //localStorage.setItem("userId", userObj.id);
    //AsyncStorage.setItem("userId", response.id);
    //user.save();
    //console.log(AsyncStorage.getItem("userId"));
    return response;
  })
  .then(function(error) {
    //console.log("Error: " + error);
    return error;
  });
}
createUser('sacha8000','sacha888@gmail.com', '000000');
*/


// This file init the projet, and displaying the home menu with navigation
function HomeScreen({ navigation }) {
  if (localStorage.getItem('terminated') < 1 || localStorage.getItem('terminated') == null){
    localStorage.setItem('terminated', 0);
  }
  let terminated = localStorage.getItem('terminated');

  return (
    <View style={styles.view}>
      <ImageBackground source={Img.background} style={styles.imageBackground}>
        <View style={styles.header}>
            <Text style={styles.title}>Shi fu mi</Text>
            <Text style={styles.littleScore}>Partie effectuée : { terminated }</Text>
        </View>
        <View style={styles.content}>
            <Buttons buttonText="Jeu Solo" navigation={navigation} NameRenderView="Game" />
            <Buttons buttonText="Jeu multijoueur" navigation={navigation} NameRenderView="MultiGame" />
            <Buttons buttonText="Configuration" navigation={navigation} NameRenderView="Configuration" />
        </View>
      </ImageBackground>
  </View>
  );
}

/* Function for routing */ 
function ConfigurationScreen({ navigation }) {
  return (
    <Configuration navigation={navigation}/>
  );
}

/* Function for routing */ 
function GameScreen({ navigation }) {
  return ( <Game navigation={navigation}/> );
}

/* Function for routing */ 
function MultiGameScreen({ navigation }) {
  return ( <MultiGame navigation={navigation}/> );
}

/* Function for routing */
function EndGameScreen({ navigation }) {
  const route = useRoute();
  const { result } = route.params;
  return ( <EndGame navigation={navigation} result={result}/> );
}

const Stack = createStackNavigator();

/* routing system */
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Configuration" component={ConfigurationScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="MultiGame" component={MultiGameScreen} />
        <Stack.Screen name="EndGame" component={EndGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 4,
    width: '100%',
    height: '100%',
},
  MenuButtonContainer : {
    alignItems: 'center',
    width: 210,
    backgroundColor: 'grey',
    padding: 30,
    marginTop: 20,
    borderWidth: 4,
    borderColor: "#774D3B",
  },
  MenuButtonText:{
    color: 'white',
    fontSize : 20,
  },
  view: {
      flex: 1,
      backgroundColor: '#1abc9c',
      alignItems: 'center',
  },
  header: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
  },
  title: {
      fontSize: 60,
      color: '#774D3B',
      marginTop: 150,
      fontWeight:'bold',
  },
  content: {
      flex: 2,
      alignItems: 'center',
      marginTop: 80,
  },
  button: {
      marginBottom: 15,
  },
});


/**************************      PARSING         ***************************** */




/***************End PARSING **************************/

export default App;