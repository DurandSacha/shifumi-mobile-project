import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
//import Home from '../components/Home';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

export default function Navigator() {

  const Stack = createStackNavigator();
  return (
    <div>
    <NavigationContainer >
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
    </div>
  );
}


//const Home = createStackNavigator<Home>();



function Home() {
  return (
    <Home/>
  );
}

function Game() {
  return (
    <Game/>
  );
}

