import Home from "./Home";
import Game from "./Game";


import React from 'react';
import { Navigator, View } from 'react-native';


const Navigation = () => {
    const renderNavigationScene = (route, navigator) => {
        switch (route.id) {
        case 'Home':
            return <Home navigator={navigator} title="Home" />;
        case 'Game':
            return <Game navigator={navigator} title="Game" againstComputer={route.againstComputer} />;
        default:
            return <View />;
        }
    };

    return (
        <Navigator
            initialRoute={{ id: 'Welcome' }}
            renderScene={renderNavigationScene}
        />
    );
};

export default Navigation;
