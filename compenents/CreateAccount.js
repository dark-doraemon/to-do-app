import {Text,TextInput,TouchableOpacity,View,Button,StyleSheet, Alert} from 'react-native'
import {useState} from 'react'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import {app} from '../config/firebase'
export const CreateAccount = ({navigation}) =>{

    const [gmail,setGmail]  = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const handleCreateAccount = () =>{
        if(gmail.slice(-10) != '@gmail.com') alert("Vui lòng nhập đúng gmail");
        if(password != confirmPassword) alert('Mật khẩu nhập lại không đúng');

        const auth = getAuth(app); //lấy đối tượng Auth của firebase Authentication thông qua app
        createUserWithEmailAndPassword(auth,gmail,password)// tạo tài khoản mới với gmail và password
        .then((userCredential) =>{
            const user = userCredential.user;
            console.log(user.email);
        })
        .catch(error =>{
            alert(error.message + " " + error.code);
        })
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.input}>
                <TextInput 
                style = {styles.ip} 
                onChangeText={text => setGmail(text)} 
                placeholder='Nhập gmail'></TextInput>

                <TextInput 
                style = {styles.ip} 
                onChangeText={text => setPassword(text)} 
                secureTextEntry
                placeholder='Nhập mật khẩu'></TextInput>

                <TextInput 
                style = {styles.ip} 
                onChangeText={text => setConfirmPassword(text)} 
                secureTextEntry
                placeholder='Nhập lại mật khẩu'></TextInput>
                
            </View>
            
            <View>
                <TouchableOpacity
                style = {styles.createAccount}
                onPress={handleCreateAccount}>
                    <Text style = {{fontSize : 20}}>Tạo Tài khoản</Text>
                </TouchableOpacity>
                <Button title='Back' onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex : 1,
        marginTop : 50,
        alignItems : 'center'
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
    createAccount : {
        marginTop : 20,
        marginBottom : 20,
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