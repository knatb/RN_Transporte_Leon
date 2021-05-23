import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'

export default class TransactScreen extends Component {

    state = {
        curp: "",
        displayName: ""
    }

    componentDidMount(){
        const {curp, displayName} = firebase.auth().currentUser;

        this.setState({curp, displayName});
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>HOME SCREEN</Text>
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