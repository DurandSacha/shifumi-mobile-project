import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, AsyncStorage } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from "./components/Game";
import MultiPlayer from "./components/MultiPlayer";
import EndGame from "./components/EndGame";
import Information from "./components/Information";
import Configuration from "./components/Configuration";
import 'react-native-gesture-handler';
import Img from './assets/images/_image';
import Buttons from './components/Layout/Buttons';
import 'localstorage-polyfill';
//import AsyncStorage from '@react-native-async-storage/async-storage';
// old: '@react-native-async-storage/async-storage';
// @react-native-community/async-storage
// use : react-native link @react-native-async-storage/async-storage   
import Parse from 'parse';

/*
Back end (Parse Server) is available and deployed with : https://github.com/DurandSacha/parse-server-example at https://shifumi-game-akarah.herokuapp.com/parse/function/hello
- Heroku app with connected github
- MongoDB is configured with : https://cloud.mongodb.com/v2 
*/

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("0123456789", "0123456789", "0123456789");
Parse.serverURL = 'http://shifumi-game-akarah.herokuapp.com/parse/'; 
Parse.liveQueryServerURL = 'ws://shifumi-game-akarah.herokuapp.com/parse/';

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
            <Image
              style={styles.icon}
              source={Img.icon}
            />
        </View>
        <View style={styles.content}>
            <Buttons buttonText="Jeu Solo" navigation={navigation} NameRenderView="Game" texture={Img.bois} />
            <Buttons buttonText="Jeu multijoueur" navigation={navigation} NameRenderView="MultiGame" texture={Img.bois} />
            <Buttons buttonText="Information" navigation={navigation} NameRenderView="Information" texture={Img.bois} />
            {/*<Buttons buttonText="Configuration" navigation={navigation} NameRenderView="Configuration" texture={Img.bois} />*/}
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
  return ( <MultiPlayer navigation={navigation}/> );
}

/* Function for routing */
function EndGameScreen({ navigation }) {
  const route = useRoute();
  const { result } = route.params;
  return ( <EndGame navigation={navigation} result={result}/> );
}

/* Function for routing */
function InformationScreen({ navigation }) {
  const route = useRoute();
  return ( <Information navigation={navigation}/> );
}

const Stack = createStackNavigator();

/* routing system */
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Information" component={InformationScreen} />
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
  icon: {
    width: 140,
    height: 140,
    marginTop:170,
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
    fontFamily: "Cochin",
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


// DEMO: 

//.then(((subscription)=>{console.log(subscription)}, (error)=>{console.log(error.message)})

export default App;