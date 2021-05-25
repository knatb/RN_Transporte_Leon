import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import mapa from '../assets/mapa.png'
import firebase from 'firebase'
require('firebase/auth')

export default class HomeScreen extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate( user ? "App" : "Auth");
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={mapa} style={{ width: 320, height: 750 }}></Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})