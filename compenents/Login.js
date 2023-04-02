import * as React from 'react';
import {Text,View,StyleSheet,Button,TouchableOpacity,TextInput, ImageBackground} from 'react-native'
import { useState, useEffect} from 'react';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth' 
import {} from '../config/firebase'
export const Login = ({navigation}) =>{
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(userName,password)
         
    }


    const handleLogin = () =>
    {
        if(userName == '' || password == '')
        {
            alert("Tài khoản hoặc mật khẩu không được để trống");
        }
        
    }

    return(
        <View>
            <ImageBackground>
                <Text style = {{textAlign : 'center',
                fontWeight : 'bold' ,
                fontSize : 30,
                marginTop : 100}}>Login</Text>

                <View style = {styles.input}>
                    <TextInput 
                    onChangeText={text => setUserName(text)} 
                    style = {styles.ip} placeholder='Tên đăng nhập'></TextInput>

                    <TextInput 
                    secureTextEntry
                    onChangeText={text => setPassword(text)} 
                    style = {styles.ip} placeholder='Mật khẩu'></TextInput>
                    <TouchableOpacity style = {styles.login} onPress={handleLogin}>
                        <Text style = {{fontSize : 30}}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style = {{marginTop : 20}}
                    onPress={() => navigation.navigate("CreateAccount")}
                    >
                        <Text style = {{textDecorationLine : 'underline'}}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    input : {
        marginTop : 30,
        alignItems : 'center',
    },

    ip :{
        marginTop : 30,
        backgroundColor : '#bbe6f3',
        width : 300,
        height : 70,
        borderRadius : 50,
        textAlign : 'center',
        fontSize : 20
    },

    login : {
        marginTop : 30,
        backgroundColor : 'lightblue',
        textAlign : 'center',
        width : 150,
        height : 50,
        borderRadius : 50,
        alignItems : 'center',
        textAlign: 'center',
        justifyContent : 'center'
    }
});