import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import firebase from 'firebase'
require('firebase/auth')

export default class HomeScreen extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate( user ? "Home" : "Login");
        })
    }

    render() {
        return (
            <View style={styles.container}>
                 <MapView style={styles.map} 
                 loadingEnabled = {true}
                 region={{
                    latitude: 21.1508926,
                    longitude: -101.7109975,
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