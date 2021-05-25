import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import TransactScreen from '../screens/TransactScreen';
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const TransactStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function HomeScreenStack() {
  return (
    <HomeStack></HomeStack>
  );
}

function TransactScreenStack() {
  return (
    <TransactStack></TransactStack>
  );
}

function ProfileScreenStack() {
  return (
      <ProfileStack.Navigator
        >
        <ProfileStack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
            headerShown: false,
          }}/>
        <ProfileStack.Screen
        name='Edit'
        component={EditProfileScreen}
        options={{
            headerShown: true,
          }}/>           
      </ProfileStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={HomeScreenStack}
        options={{ tabBarLabel: "Inicio" }}
      />
      <Tab.Screen
        name="Trámite"
        component={TransactScreenStack}
        options={{ tabBarLabel: "Trámite" }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreenStack}
        options={{ tabBarLabel: "Perfil" }}
      />
    </Tab.Navigator>
  );
}