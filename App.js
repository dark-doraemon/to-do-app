import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,Image ,TouchableOpacity,TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {Home} from './compenents/Products';
import {Details} from './compenents/Details';
import {Login} from './compenents/Login';
import {CreateAccount} from './compenents/CreateAccount';
let Stack = createNativeStackNavigator();

export default function App() {
return (
    <View style={styles.container}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown : false}}>
                <Stack.Screen name = 'Login' component={Login}/>
                <Stack.Screen name = "Products" component ={Home} />
                <Stack.Screen name = "Details" component={Details} />
                <Stack.Screen name = "CreateAccount" component={CreateAccount} />
            </Stack.Navigator>
            </NavigationContainer>
  </View>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
});
