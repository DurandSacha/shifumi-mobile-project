import React, { PropTypes, Component } from 'react';
import { View, Text,  Button, Alert, StyleSheet , Image, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import Card from './Layout/Card';
import Buttons from './Layout/Buttons';
import Img from '../assets/images/_image';
import 'localstorage-polyfill';

const br = `\n`;

export default class Information extends Component {

    constructor(props) {
        super(props);
    }

    render = () => {
            return(
                <View style={{flex:1}}>
                     <ImageBackground source={Img.background} style={styles.imageBackground}>
                    
                     <View style={{flex:2, justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                        <Text style={styles.centerText}>ShiFumi Heroes</Text>
                    </View>
                    <View style={{flex:5, justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                        <ScrollView>
                            <Text style={[{}, styles.centerTextMin]}>Le jeu du Shifumi est une bataille, vous devez battre l'adversaire à l'aide de choix. 
                            Choisissez entre la pierre, la feuille ou les ciseaux. {br}{br}

                            La feuille bat la pierre. {br}{br}
                            La pierre bat les ciseaux. {br}{br}
                            Les ciseaux battent la feuille. {br}{br}

                            Une partie se déroule en 3 manches. Pensez donc à la psychologie du joueur adverse pour élaborer des stratégies.{br}{br}
                            Notez que l'application recherche des joueurs pendant 45 secondes, si il n'y a pas de joueurs disponible, alors il faudra essayer plus tard, ou inviter vos amis ! 
                            En attendant, vous pouvez vous entrainer avec le mode solo.
                            </Text>
                        </ScrollView>
                    </View>
                    </ImageBackground>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    centerTextTimeout :{
        fontSize:15,
        color: 'rgb(240,240,240)',
        paddingLeft: 60,
        paddingRight: 60,
    },
    centerTextMin:{
        //marginTop: 30,
        //justifyContent: 'center',
        fontSize: 17,
        //marginLeft:150,
        fontWeight: 'bold',
        color:'white',
        paddingLeft: 50,
        paddingRight: 50,
    },
    centerText:{
        //marginTop: 200,
        //justifyContent: 'center',
        fontSize: 25,
        //marginLeft:50,
        fontWeight: 'bold',
        color:'white',
    },
    view: {  
        flex: 1,
        backgroundColor: '#1abc9c',
    },
    imageBackground: {
        flex: 4,
        width: '100%',
        height: '100%',
    },
});