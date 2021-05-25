import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { Directions } from 'react-native-gesture-handler';

export default function TransactScreen (){
    return(
        <View style = {styles.view}>
            <View style={styles.data}>
                <Text style={styles.datainfo}>Tu Pagobus expira el: DD/MM/YYYY</Text>
                <Text style={styles.datainfo}>Por favor anexa tu documento para proceder a la renovación de tu tarjeta PagoBus</Text>
            </View>
            <View style={styles.fileView}>
            <TouchableOpacity style={styles.fileSelect}>
                <Text style={{color:'#FFF'}} >Seleccionar archivo...</Text>
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
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    data: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
        width: 350
    },
    datainfo:{
        margin: 30
    },
    fileView:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 20,
        height: 300,
        width: 300,
        backgroundColor: '#BFBFBF',
        borderRadius: 20
    },
    fileSelect:{
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor: '#404040',
        height: 30,
        padding: 10
    }
  });

  // gris claro #BFBFBF
  // gris #404040
  //naranja #EB9142
  //azul #31348F