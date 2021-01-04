import Home from "./Home";
import Game from "./Game";

export default class Navigation extends Component {

    render() {
        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    <Text style={styles.title}>ShiFuMi</Text>
                </View>
                <View style={styles.content}>
                    <View style={{ marginBottom: 30 }}>
                        <Button title="Jeu solo" onPress={() => navigation.navigate('Game')} color="#138a72" />
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <Button title="Configuration" onPress={() => navigation.navigate('Configuration')} color="#138a72" />
                    </View>
                </View>
            </View>
        );
    }
}

const MainTabNavigator = TabNavigator(
    {
        Tab1Home: { screen: Tab1Screen },
        Tab2Home: { screen: Tab2Screen }
    }
);

const LoginRegisterStackNavigator = StackNavigator({
    Login: { screen: LoginScreen }
});

const ModalStackNavigator = StackNavigator({
    MainTabNavigator:          { screen: MainTabNavigator            },
    LoginScreenStackNavigator: { screen: LoginRegisterStackNavigator }
}, {
    headerMode: 'none',
    mode:       'modal'
});


export default Navigation;
