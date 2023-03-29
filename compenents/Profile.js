import * as React from 'react';
import {Text,View,StyleSheet,Button} from 'react-native'


export function Profile({ navigation: { setParams } }){
    //get the param
    const obj = route.params;
    return(
        <View>
            <Text style = {{fontSize : "40"}}>
                <View>
                    <Button title="Go to Home" onPress={() => navigation.navigate("Home")}/>
                    <Button title= "Update Params" 
                    />
                    {console.log(obj)}
                </View>
            </Text>
        </View>
    )
}