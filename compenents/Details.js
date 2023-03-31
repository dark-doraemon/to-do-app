import * as React from 'react';
import {Text,View,StyleSheet,Button,Image, TouchableOpacity} from 'react-native'


export function Details({ navigation,route}){
    //get the params
    const {id,title,price,hinh} = route.params;
    return(
        <View style ={styles.container}>
            <Text>{id}</Text>    
            <Text>{title}</Text>
            <Text>{price}</Text>
            <Image source={{uri : hinh}} style = {{width : 300,height : 200}} />
            <Button title='Go Back' onPress={() => navigation.goBack()}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems : 'center'
    },
    });