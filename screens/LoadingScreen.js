import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase'
require('firebase/auth')

export default class LoadingScreen extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate( user ? "App" : "Auth");
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
                
                <ActivityIndicator size='large'></ActivityIndicator>
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