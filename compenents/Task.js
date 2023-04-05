import { View, Text,StyleSheet,TouchableOpacity ,Image, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import CheckBox from 'react-native-check-box'
export const Task = (props) => {

    const {number} = props;
    const numberText = number < 10 ? `0${number}` : number;
    const numberBG = number % 2 == 0 ? (styles.even) : (styles.odd);
    return (
        <View>
            <View style = {styles.item}>
                
                <View style = {{marginRight : 10}}>
                    <CheckBox 
                    isChecked = {props.isChecked}
                    onClick={props.onClick}
                    />
                </View>

                <View style = {[styles.number,numberBG]}><Text>{numberText}</Text></View>

                <View style = {styles.content}>
                    <Text style = {{fontSize : 20}}>{props.content}</Text>
                </View>
                
                <View style = {styles.delete}>
                    <TouchableOpacity
                    onPress={props.onDeleteTask}
                    >
                        <Image 
                        style={{ width: 30, height: 30 }}
                        source={{uri : 'https://cdn-icons-png.flaticon.com/512/3481/3481306.png'}}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  )
};

const styles = StyleSheet.create({
    item : {
        flexDirection : 'row',
        backgroundColor  : '#fff',
        marginBottom : 15,
        height : 50,
        alignItems : 'center',
        paddingHorizontal : 10,
        borderRadius : 15,
    },
    even : {
        backgroundColor : '#55f253'
    },

    odd : {
         backgroundColor : '#48cfef'
    },
    number : {
        width : 35, 
        height : 35,
        justifyContent : 'center',
        alignItems : 'center',
        marginRight : 10,
        borderRadius : 10
    },

    content : {
        marginLeft : 10
    },

    delete : {
        flex : 1,
        alignItems : 'flex-end'
    }
});