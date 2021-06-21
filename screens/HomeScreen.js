import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
//import mapa from '../assets/mapa.png'
import firebase from 'firebase'
require('firebase/auth')

export default class HomeScreen extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate( user ? "App" : "Auth");
        })
    }

    //<Image source={mapa} style={{ width: 320, height: 750 }}></Image>
    //MARKER
    render() {
        return (
            <View style={styles.container}>
                 <MapView style={styles.map} 
                 loadingEnabled = {true}
                 region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                 }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
})