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
import config from './config.json';


/*
run : parse-server --appId 123456789 --masterKey 123456789 --databaseURI mongodb://localhost/shifumi
*/

/* Configuring parse */
const Parse = require('parse/react-native.js');

//Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY", "YOUR_MASTERKEY");

Parse.setAsyncStorage(localStorage);
Parse.initialize("0123456789", "0123456789");
Parse.serverURL = 'http://192.168.2.66:1337/parse/';  // localhost or 10.0.2.2 or 0.0.0.0 or 192.168.2.66

/*
Parse.appId = '0123456789';
Parse.applicationId = '0123456789';
Parse.databaseURI = 'mongodb://10.0.2.2:27017/shifumi';
Parse.restAPIKey = '0123456789';
*/


//console.log('app.js executed');


/***************** SIGN UP TEST  ***************** */

newUser = async () => {
  const user = new Parse.User();
  user.set("username", "name02");
  user.set("password", "pass02");
  user.set("email", "sacha.durand@akarah.com");

  console.log(user);
  try {
    user.signUp();
    localStorage.setItem("userId", user.id);
    //await user.save();
    
  }
  catch (error) {
  // Show the error message somewhere and let the user try again.
  alert("Error: " + error.code + " " + error.message);
  }
}
newUser();


/*****************FETCHING WITH HEADER ***************** */

/*

var myHeaders = new Headers();
myHeaders.append("X-Parse-Application-Id", "0123456789");
myHeaders.append("Content-Type", "application/json");

var params = { 
  method: 'GET',
  headers: myHeaders,
  //mode: 'cors',
  //cache: 'default' };
}

fetch('http://192.168.2.66:1337/parse/classes/_User', params).then(function(response) {
  console.log(response);
})
.then(function(error) {
  alert("Error: " + error);
  console.log('error fetch');
});

*/

/*****************AXIOS REQUEST TEST ********************* */
/*
testServer = async () => {
Axios.post('http://192.168.2.66:1337/parse/classes/_User').then(function (response) {
  console.log("POST RESPONSE: "+JSON.stringify(response));
})
testServer();
*/

/***************** SIGNUP FUNCTION ***************** */

const user = new Parse.User();

user.set("username", "sacha");
user.set("email", "sacha@akarah.com");
user.set("password", "000000");

user.signUp()
  .then((userObj) => {
    alert('user signed function 2');
      localStorage.setItem("userId", userObj.id);

      return userObj;
  }, (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      console.error('Failed to create new object, with error code: ' + error.message);

      return null;
  });







// This file init the projet, and displaying the home menu with navigation
function HomeScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <ImageBackground source={Img.background} style={styles.imageBackground}>
        <View style={styles.header}>
            <Text style={styles.title}>Shi fu mi</Text>
        </View>
        <View style={styles.content}>
            <Buttons buttonText="Jeu Solo" navigation={navigation} NameRenderView="Game" />
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