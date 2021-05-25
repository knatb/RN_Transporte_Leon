import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const navigation = useNavigation();

    return(
    <View style = {styles.view}>
        <View style={styles.datos}>
            <Text>Francisco Fernando Cruz Galvez</Text>
            <Text>90 años</Text>
            <Text>Sexo: Otro</Text>
            <Text>Pagobus: Preferencial</Text>
        </View>
        <View style={styles.buttonsView}>
        <TouchableOpacity >
            <Text style={styles.buttons} >EDITAR CUENTA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
            <Text style={styles.buttons} >CERRAR SESIÓN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.buttonDel} >ELIMINAR CUENTA</Text>
        </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    datos: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        backgroundColor: '#cccccc',
        width: 300,
        borderRadius: 20
    },
    buttonsView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
        width: 300,
    },
    buttons:{
        fontSize: 20,
        backgroundColor: '#EB9142',
        color: '#000',
        alignSelf: 'center',
        width: 300,
        padding: 15,
        textAlign: 'center',
        marginTop: 10
    },
    buttonDel:{
        fontSize: 20,
        backgroundColor: '#cc0000',
        color: '#FFF',
        alignSelf: 'center',
        width: 300,
        padding: 15,
        textAlign: 'center',
        marginTop: 10
    },
  });

  export default ProfileScreen;

  // gris claro #BFBFBF
  // gris #404040
  //naranja #EB9142
  //azul #31348F