import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Directions } from 'react-native-gesture-handler';
import firebase from 'firebase'
require('firebase/auth')

function showCurp(){
    var str = "lolk000708hgtppna1@fieras.com";
    var res = str.split("@");
    //document.getElementById("demo").innerHTML = res[0];
}

const EditProfileScreen = ({navigation}) => {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [date, setDate] = useState(new Date());
    const [curp, setCurp] = useState("");
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const handleUpdate = () => {
        navigation.navigate('Profile')
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false);
        console.log(date);
      };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };

    return(
        <View style = {styles.view}>
            <Text style={styles.title}>ACTUALIZA TU CUENTA</Text>
            <View style = {styles.viewForm}>
            <TextInput 
                    style={styles.inputs}
                    placeholder='LOLK000708HGTPPNA1'
                    keyboardType='default'
                    onChangeText={setCurp}
                    value={curp}
                    editable={false}
                    selectTextOnFocus={false}
                />
                <TextInput 
                    style={styles.inputs}
                    placeholder='Nombre(s)'
                    keyboardType='default'                   
                    onChangeText={setFName}
                    value={fName}
                />
                <TextInput 
                    style={styles.inputs}
                    placeholder='Apellido(s)'
                    keyboardType='default'
                    onChangeText={setLName}
                    value={lName}
                />                      
                <View>
                    <TouchableOpacity onPress={showDatepicker}>
                        <Text style={styles.btnDate} >Seleccionar fecha de nacimiento</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        mode={mode}
                        value={date}
                        display="default"
                        onChange={onChangeDate}
                        />
                    )}
                </View>
                <View style = {styles.containers}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Text style={styles.btnUpdate} >CANCELAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleUpdate}>
                        <Text style={styles.btnUpdate} >ACTUALIZAR CUENTA</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 30,
    },
    imageLogo: {
      width: '100%',
    },
    view: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'column',        
        alignItems: 'center',
        justifyContent: 'center',

    },
    viewForm:{
        width: '70%'
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
    btnUpdate:{
        fontSize: 20,
        backgroundColor: '#EB9142',
        color: '#FFF',
        alignSelf: 'center',
        width: '100%',
        padding: 15,
        textAlign: 'center',        
        marginTop: 10
    },
    pickers: {
        flex: 1,
        flexDirection: 'row',
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
    }
  });

  // gris claro #BFBFBF
  // gris #404040
  //naranja #EB9142
  //azul #31348F

export default EditProfileScreen;

/*

<TextInput 
    style={styles.inputs}
    placeholder='Contraseña'
    keyboardType='default'
    secureTextEntry
    onChangeText={onChangePassword}
    value={password}
/>
<TextInput 
    style={styles.inputs} 
    placeholder='Confirmar contraseña' 
    keyboardType='default'
    secureTextEntry
/>
*/
