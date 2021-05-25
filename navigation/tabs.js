import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from "react";
import { NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactScreen from '../screens/TransactScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
           <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Transact" component={TransactScreen}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>
                <Tab.Screen name="Edit" component={EditProfileScreen}/>
            </Tab.Navigator>
    );
}

export default Tabs;