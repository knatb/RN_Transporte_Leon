import * as React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactScreen from '../screens/TransactScreen';
import RoutesList from '../screens/RoutesList';

const Tab = createBottomTabNavigator();

const Tabs = ({route}) => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style : {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor:'#ffdb99',
                    borderRadius: 15,
                    height: 90,
                }
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                    iconName = focused
                    ? 'home-sharp'
                    : 'home-outline';
                } else if (route.name === 'Transact') {
                    iconName = focused ? 'mail-unread' : 'mail-unread-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'glasses' : 'glasses-outline';
                } else if (route.name === 'Edit') {
                    iconName = focused ? 'people-circle' : 'person-outline';
                } 
                else if (route.name === 'Rutas') {
                    iconName = focused ? 'bus' : 'bus-outline';
                } 
                return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" 
                component={HomeScreen} />
            <Tab.Screen name = "Rutas" 
                component={RoutesList} />
            <Tab.Screen name="Transact" 
                component={TransactScreen}
                initialParams={route.params}
                options={{ tabBarBadge: 1 }}/>
            <Tab.Screen name="Profile" 
                component={ProfileScreen} 
                initialParams={route.params} />
            <Tab.Screen name="Edit" 
                component={EditProfileScreen}
                initialParams={route.params} />
            
        </Tab.Navigator>
    );
}

const style = StyleSheet.create({
    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0, 
            height: 10,  
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.6,
        elevation: 6
    }
});

export default Tabs;