import React, { Component } from 'react';
import {TextInput, View, Alert, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import logo from '../assets/leon-logo.png';
import firebase from 'firebase'
require('firebase/auth')

export default class RegisterScreen extends Component {

    state = {
        fname: "",
        lname: "",
        date: (new Date()),
        curp:  "",
        password: "",
        cpassword: "",
        errorMessage: null,
        show: false,
        mode: 'date'
    }

    createAlert = () =>
        Alert.alert(
        "Transporte León",
        "Usuario creado con éxito",
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
    );

    handleRegister  = () => {
        const {curp, password} = this.state;
        let error = {};
        let curpEmail = `${curp}@fieras.com`;
        if(this.state.password != this.state.cpassword){
            error.errorMessage = true;
        } else {
            firebase.auth().createUserWithEmailAndPassword(curpEmail, password)
            .then(useCredentials => {
                return firebase.firestore().collection('usuariosLeon').doc(useCredentials.user.uid).set({
                    nombre: this.state.fname,
                    apellidos: this.state.lname,
                    fechnam: this.state.date,
                    curp: curpEmail,
                    password: password
                })
            })
            .then(() => { 
                this.createAlert();
                console.log(this.state); 
                this.props.navigation.navigate("Login")})
            .catch(error => 
                this.setState({
                    errorMessage: error.message}
                ));
        }
    }

    render() {

        const onChangeDate = (event, selectedDate) => {
            const currentDate = selectedDate || this.state.date;
            this.setState({date:currentDate});
            this.setState({show: false});
            console.log(this.state.date);
          };

        const showMode = (currentMode) => {
            this.setState({show: true});
            this.setState({mode: currentMode});
        };
        
        const showDatepicker = () => {
            showMode('date');
        };

        return (
            <View style = {styles.viewRegister}>
                <Image source={logo} style={{ width: 280, height: 230 }} /> 
                <View style={styles.error}>
                    <Text>{this.state.errorMessage && 
                        <Text>{this.state.errorMessage}</Text>}
                    </Text>
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
                    <View>
                        <TouchableOpacity onPress={showDatepicker}>
                            <Text style={styles.btnDate} >Seleccionar fecha de nacimiento</Text>
                        </TouchableOpacity>
                        {this.state.show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            display="default"
                            onChange={onChangeDate}
                            />
                        )}
                    </View>
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
                            <Text style={styles.btnRegister} >Registrarme</Text>
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewRegister: {
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
        marginTop: 5,
        marginBottom: 15,
        height: 40,
        padding: 10,
        borderRadius: 7
    },
    btnRegister:{
        fontSize: 20,
        backgroundColor: '#404040',
        color: '#FFF',
        alignSelf: 'center',
        width: '100%',
        padding: 15,
        textAlign: 'center',
        borderRadius: 7
    },
    btnDate:{
        fontSize: 16,
        backgroundColor: '#EB9142',
        color: '#FFF',
        alignSelf: 'center',
        width: '100%',
        padding: 15,        
        marginTop: 5,
        marginBottom: 15,
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
    error: {
        alignItems: 'center',
        justifyContent: 'center',
    }
  });
