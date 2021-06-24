import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import firebase from 'firebase'
import { set } from 'date-fns';
require('firebase/auth')

const ProfileScreen = ({navigation, route}) => {

    const {data, userUID} = route.params;

    const [fName, setFName] = useState(data.nombre);
    const [lName, setLName] = useState(data.apellidos);
    const [date, setDate] = useState(data.fechnam);
    const [errorMessage, setError] = useState(null);

    useEffect(() => {
        const connectionListenner = firebase.firestore().collection('usuariosLeon').doc(userUID).onSnapshot(docSnapshot => {
            const dataFirebase = docSnapshot.data();
            setFName(dataFirebase.nombre);
            setLName(dataFirebase.apellidos);
            setDate(dataFirebase.fechnam);
            // ...
          }, err => {
            console.log(`Encountered error: ${err}`);
          });

        return () => {
            connectionListenner();
        }
    },[])    

    const fullName = fName + " " + lName;

    const calculateAge = () => {
        var today = new Date(); 
        var birth = date;

        var todayYear = moment(today).year();
        var birthYear = moment(birth).year();

        var age_now = parseInt(todayYear) - parseInt(birthYear);
        return age_now;
    }

    const handleLogOut = () => { 
        firebase.auth().signOut().then(() => {
            console.log('SALIÓ'); 
            navigation.navigate("Login")
        });
    }

    const handleDelete = async() => {  
        try{
            await firebase.firestore().collection('usuariosLeon').doc(userUID).delete().then(()=> {
            firebase.auth().currentUser.delete();
            this.props.navigation.navigate("Login");
            console.log("BORRADO");
        })
        }catch(error){
            console.log(error);
        }
    }

    const createAlert = () =>
        Alert.alert(
        "Eliminar cuenta",
        "¿Desea eliminar su cuenta?",
        [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "Sí, estoy seguro", onPress: () => handleDelete() }
        ],
        { cancelable: false }
    );

    return (
        <View style = {styles.view}>
            <Text style={styles.title}>MI CUENTA</Text>
            <View style={styles.datos}>
                <Text style={styles.profileText}>Nombre: {fullName}</Text>
                <Text style={styles.profileText}>Edad: {calculateAge()} años</Text>   
                <Text style={styles.profileText}>Pagobus: Preferencial</Text>
            </View>
            <View style={styles.buttonsView}>
                <TouchableOpacity onPress={handleLogOut}>
                    <Text style={styles.buttons} >CERRAR SESIÓN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={createAlert}>
                    <Text style={styles.buttonDel} >ELIMINAR CUENTA</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
    profileText:{
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10
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
        marginTop: 10,
        borderRadius:10
    },
    buttonDel:{
        fontSize: 20,
        backgroundColor: '#cc0000',
        color: '#FFF',
        alignSelf: 'center',
        width: 300,
        padding: 15,
        textAlign: 'center',
        marginTop: 10,
        borderRadius:10
    },
  });

export default ProfileScreen;

  // gris claro #BFBFBF
  // gris #404040
  //naranja #EB9142
  //azul #31348F