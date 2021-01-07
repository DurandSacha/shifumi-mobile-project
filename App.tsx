import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { props } from 'react-native';
import Game from "./components/Game";
import Configuration from "./components/Configuration";


// This file init the projet, and displaying the home menu with navigation
function HomeScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <View style={styles.header}>
          <Text style={styles.title}>Shi Fu Mi</Text>
      </View>
      <View style={styles.content}>
          <View style={{ marginBottom: 30 }}>
              <Button title="Jeu solo" onPress={() => navigation.push('Game')} color="#138a72" />
          </View>
          <View style={{ marginBottom: 30 }}>
              <Button title="Configuration" onPress={() => navigation.push('Configuration')} color="#138a72" />
          </View>
      </View>
  </View>
  );
}

/* Function for routing */ 
function ConfigurationScreen() {
  return (
    <Configuration/>
  );
}

/* Function for routing */ 
function GameScreen() {
  return (
    <Game {...props} />
  );
}

const Stack = createStackNavigator();

/* a router */
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Configuration" component={ConfigurationScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  view: {
      flex: 1,
      backgroundColor: '#1abc9c',
  },
  header: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
  },
  title: {
      fontSize: 80,
      color: '#ecf0f1',
      marginTop: 16,
  },
  content: {
      flex: 2,
  },
  button: {
      marginBottom: 10,
  },
});


export default App;