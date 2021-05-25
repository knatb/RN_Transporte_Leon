import React, { Component } from 'react';
import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, StatusBar } from 'react-native';
import logo from '../assets/leon-logo.png';
import firebase from 'firebase'
require('firebase/auth')
import { validateEmail } from '../utils/validate';
export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        curp:  "",
        password: "",
        errorMessage: null
    }

    handleLogin = () => {
        const {curp, password} = this.state;
        let error = {};
        let curpEmail = `${curp}@fieras.com`;
        if(!validateEmail(curpEmail)){
            error.errorMessage = true;
        } else {
            console.log(curpEmail);
            firebase.auth().signInWithEmailAndPassword(curpEmail,password)
            .then(() => { console.log("OK"); this.props.navigation.navigate("Tabs")})
            
            .catch(error => this.setState({errorMessage: error.message}));
        }
    }

    render() {
        return (
        <KeyboardAvoidingView style={styles.containers}>
            <TouchableWithoutFeedback>
                <View style = {styles.viewLogin}>
                    <StatusBar barStyle="light-content"></StatusBar>
                    <Image source={logo} style={{ width: 280, height: 230 }} /> 
                    <View style={styles.error}>
                        <Text>{this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}</Text>
                    </View>
                    <View style = {styles.viewForm}>
                        <TextInput 
                            style={styles.inputs} 
                            placeholder='CURP' 
                            keyboardType='default'
                            onChangeText={(curp) => { this.setState({curp}); }}
                            value={this.state.curp}
                        />
                        <TextInput 
                            style={styles.inputs} 
                            placeholder='Contraseña'
                            keyboardType='default'
                            secureTextEntry
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                        />
                        <View>
                            <TouchableOpacity onPress={this.handleLogin}>
                                <Text style={styles.btnLogin} >Iniciar Sesión</Text>
                            </TouchableOpacity>
                        </View>                    
                        <Text style={styles.bText1} >¿No tienes cuenta?</Text>
                        <View >
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                                <Text style={styles.bText2} >Registrate aquí</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        )
    }
}

function defaultValue() {
    return {
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageLogo: {
      width: '100%',
    },
    viewLogin: {
        flex: 1,
        flexDirection: 'column',        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    viewForm:{
        width: '100%'
    },
    inputs: {
        backgroundColor: '#BFBFBF',
        color: '#FFF',
        borderColor: '#EB9142',
        fontWeight: 'normal',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20,
        height: 40,
        padding: 10,
        borderRadius: 7
    },
    btnLogin:{
        fontSize: 20,
        backgroundColor: '#404040',
        color: '#FFF',
        alignSelf: 'center',
        width: '100%',
        padding: 15,
        textAlign: 'center',
        borderRadius: 7
    },
    bText1: {
        marginTop: 30,
        fontSize: 15,
        color: '#000',
        alignSelf: 'center'
    },
    bText2: {
        fontSize: 15,
        color: '#EB9142',
        fontWeight: 'bold',
        alignSelf: 'center'
    },    
    errorInput:{
        borderColor: "#940c0c",
        color: '#ff0000',
    },
    error: {
        alignItems: 'center',
        justifyContent: 'center',

    }
  });
