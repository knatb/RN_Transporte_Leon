import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase'
require('firebase/auth')

export default class ProfileScreen extends Component {
  
    state = {
        fname: "",
        lname: "",
        date: (new Date()),
        deud: "",
        venc: (new Date()),
        errorMessage: null,
    }

    handleLogOut = () => { 
        firebase.auth().signOut().then(() => {
            console.log('SALIÓ'); 
            this.props.navigation.navigate("Login")
            this.state.fname = "";
        });
    }

    handleDelete = async() => {
        await firebase.firestore().collection('usuariosLeon').doc(user.uid).delete().then((value)=> {
            this.handleLogOut;
            user.delete();
        })
    }

    getData = async() => {
        const usuariosCol = firebase.firestore().collection('usuariosLeon')
        try{
            const dataUser = [];
            const snapshot = await usuariosCol.doc(user.uid).get();

            snapshot.forEach((doc) => {
                dataUser.push(doc.data());
            })

        } catch(error){

        }
        
    }

    createAlert = () =>
        Alert.alert(
        "Eliminar cuenta",
        "¿Desea eliminar su cuenta?",
        [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "Sí, estoy seguro", onPress: () => this.handleDelete }
        ],
        { cancelable: false }
    );

    render() {
        return (
        <View style = {styles.view}>
            <Text style={styles.title}>MI CUENTA</Text>
            <View style={styles.datos}>
                <Text>Francisco Fernando Cruz Galvez</Text>
                <Text>90 años</Text>
                <Text>Pagobus: Preferencial</Text>
            </View>
            <View style={styles.buttonsView}>
                <TouchableOpacity onPress={this.handleLogOut}>
                    <Text style={styles.buttons} >CERRAR SESIÓN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.createAlert}>
                    <Text style={styles.buttonDel} >ELIMINAR CUENTA</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}
// UWU 
const styles = StyleSheet.create({
    view: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 100
    },
    datos: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
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

  //export default ProfileScreen;

  // gris claro #BFBFBF
  // gris #404040
  //naranja #EB9142
  //azul #31348F