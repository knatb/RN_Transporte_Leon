import 'react-native-gesture-handler';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from  './screens/LoginScreen';
import RegisterScreen from  './screens/RegisterScreen';
import Navigation from  './screens/Navigation';

import firebase from 'firebase';
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyAKde-zTd16g1kVoDObItZaj5MBXWCIUY4",
  authDomain: "appleonproyect.firebaseapp.com",
  projectId: "appleonproyect",
  storageBucket: "appleonproyect.appspot.com",
  messagingSenderId: "941838039427",
  appId: "1:941838039427:web:229246b6f103d9b2df1eb6"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Transporte León",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Home"
          component={Navigation}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}