import * as React from 'react';

import { Text, TextProps } from './Themed';
import { StyleSheet } from 'react-native';
import { Game } from 'Game.tsx';
import { Button, View } from 'react-native';

function goGame(){
    return <Game/>
}
export function Home() {
  return(
        <View>
            <Button
                onPress={goGame}
                title="Jouer"
                color="#841584"
                accessibilityLabel="Jouer"
            />

            <Button
                onPress={goGame}
                title="Configuration"
                color="#841584"
                accessibilityLabel="Configuration"
            />
        </View>
  );
}

export default Home
