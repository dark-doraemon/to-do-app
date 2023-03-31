import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,Image ,TouchableOpacity,TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {Home} from './compenents/Home';
import {Details} from './compenents/Details'

let Stack =createNativeStackNavigator();
let Tab = createBottomTabNavigator();
let Drawer = createDrawerNavigator();


export default function App() {
return (
    <View style={styles.container}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = "Products" component ={Home} />
                <Stack.Screen name = "Details" component={Details} />
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
