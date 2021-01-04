import * as React from 'react';

import { Text, TextProps } from './Themed';
import { View  } from "react-native";
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Game() {
  return (
  <div>
    <View>
        <Text style={styles.text}>Selectionner pierre, feuille ou ciseaux  </Text>

        <Button
        icon={
            <Icon
            name="arrow-right"
            size={15}
            color="white"
            />
        }
        title="Pierre"
        />

        <Button
        icon={
            <Icon
            name="arrow-right"
            size={15}
            color="red"
            />
        }
        title="Feuille"
        />

        <Button
        icon={
            <Icon
            name="arrow-right"
            size={15}
            color="blue"
            />
        }
        title="Ciseaux"
        />

        {/* TODO: if buttons is clicked, submit a choice and comparate with a bot */}


    </View>
  </div>
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize : 18,
        color : 'grey',
    },
  });

export default Game;