import React from 'react';
import { createAppContainer } from '@react-navigation/compat';
import { createSwitchNavigator } from '@react-navigation/compat';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileScreen from  './screens/ProfileScreen';
import TransactScreen from  './screens/TransactScreen';
import LoadingScreen from  './screens/LoadingScreen';
import LoginScreen from  './screens/LoginScreen';
import RegisterScreen from  './screens/RegisterScreen';
import HomeScreen from  './screens/HomeScreen';

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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator({
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "Loading"
  })
)

const AppTabNavigator = createBottomTabNavigator (
  {
    Perfil: {
      screen : ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor} style={{shadowColor: "E9446A"}}/>
      }
    },
    Tramite : {
      screen : TransactScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-chatboxes" size={24} color={tintColor}/>
      }
    }
  },
  {
    tabBarOptions : {
      activeTintColor: "#161F3D",
      inactiveTinColor: "#B8BBC4",
      showLabel: false,
    }
  }
);
