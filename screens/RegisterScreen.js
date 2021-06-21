import React, { Component } from 'react';
import {TextInput, View, Text, StyleSheet, RNPicker, Image, TouchableOpacity} from 'react-native';
import logo from '../assets/leon-logo.png';
import firebase from 'firebase'
require('firebase/auth')

export default class RegisterScreen extends Component {
    state = {
        fname: "",
        lname: "",
        age: 0,
        sexo: "",
        curp:  "",
        password: "",
        cpassword: "",
        errorMessage: null
    }

    handleRegister  = () => {
        const {curp, password} = this.state;
        let error = {};
        let curpEmail = `${curp}@fieras.com`;
        if(this.state.password != this.state.cpassword){
            error.errorMessage = true;
        } else {
            firebase.auth().createUserWithEmailAndPassword(curpEmail, password)
            .then(useCredentials => {
            return firebase.firestore().collection('usuarios').doc(useCredentials.user.uid).set({
                firstName: fname,
                lastName: lname,
                age: age,
                gender: sexo,
                curp: curpEmail,
                password: password
            })
            })
            .then(() => { console.log("REGISTRO EXITOSO"); console.log(this.state); this.props.navigation.navigate("Login")})
            .catch(error => this.setState({errorMessage: error.message}));
        }
    }

    render() {
        return (
            <View style = {styles.viewLogin}>
                <Image source={logo} style={{ width: 280, height: 230 }} /> 
                <View style={styles.error}>
                    <Text>{this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}</Text>
                </View>
                <View>
                    <TextInput 
                        style={styles.inputs} 
                        placeholder='Nombre(s)' 
                        keyboardType='default'
                        onChangeText={fname => this.setState({fname})}
                        value={this.state.fname}
                    />
                    <TextInput 
                        style={styles.inputs} 
                        placeholder='Apellido(s)' 
                        keyboardType='default'
                        onChangeText={lname => this.setState({lname})}
                        value={this.state.lname}
                    />
                    <TextInput 
                        style={styles.selectPicker} 
                        placeholder='Edad' 
                        keyboardType='numeric'
                        onChangeText={age => this.setState({age})}
                        value={this.state.age}
                    />
                    <TextInput 
                        style={styles.selectPicker} 
                        placeholder='Sexo' 
                        keyboardType='default'
                        onChangeText={sexo => this.setState({sexo})}
                        value={this.state.sexo}
                    />
                    <TextInput 
                        style={styles.inputs} 
                        placeholder='Curp' 
                        keyboardType='default'
                        onChangeText={curp => this.setState({curp})}
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
                    <TextInput 
                        style={styles.inputs} 
                        placeholder='Confirmar contraseña' 
                        keyboardType='default'
                        secureTextEntry
                        onChangeText={cpassword => this.setState({cpassword})}
                        value={this.state.cpassword}
                    />
                    <View>
                        <TouchableOpacity onPress={this.handleRegister}>
                            <Text style={styles.btnLogin} >Registrarme</Text>
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        color: '#000000',
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
    errorInput:{
        borderColor: "#940c0c"
    },
    row: {
        flex: 1,
        flexDirection: "row"
      },
      inputWrap: {
        flex: 1,
        borderColor: "#cccccc",
        borderBottomWidth: 1,
        marginBottom: 10
      },
      selectPicker: {
        backgroundColor: '#BFBFBF',
        color: '#FFF',
        borderColor: '#EB9142',
        fontWeight: 'normal',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        height: 40,
        padding: 10
    },    
    error: {
        alignItems: 'center',
        justifyContent: 'center',
    }
  });
