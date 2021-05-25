import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
                <Text>Home</Text>
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