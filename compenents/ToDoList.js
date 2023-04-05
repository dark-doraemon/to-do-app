import { useState } from 'react';
import {View,Text,
        TouchableOpacity,
        TextInput,StyleSheet,
        Keyboard,
        Alert,
        ScrollView} from 'react-native';
import {Task} from './Task'
export const ToDoList = ({ route, navigation }) =>{

    const [task,setTask] = useState('');
    const gmail = route.params;
    const [taskList,setTaskList] = useState([]);
    const [isChecked,setIsChecked] = useState(false);

    const handleAdd = () =>{
        if(task.length === 0) alert('Bạn chưa nhập công việc');
        else {
            setTaskList([...taskList,task])
            setTask('');
            Keyboard.dismiss()
        }
    }

    const handleDelete = (index) => {
        Alert.alert(
            "Chú ý",
            "Bạn có chắc chắn muốn xóa",
            [
                {
                    text : 'Cancel',
                    onPress : () => console.log("Cancel Pressed"),
                },
                {
                    text : 'Ok',
                    onPress : () => {
                        let taskListTmp = [...taskList];
                        taskListTmp.splice(index,1);
                        setTaskList(taskListTmp); 
                    }
                }
            ]
        );
    }

    return(
        <View style = {styles.container}>
            {/* toàn bộ khúc trên */}
            <View>
                {/* Nút thoát */}
                <View style = {{marginTop  : 50}}>
                    <View style = {{flexDirection : 'row'}}>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('Login')}
                        style = {styles.customQuitButton}>
                            <Text > &lt;= Sign Out</Text>
                        </TouchableOpacity>

                        <View style = {styles.hello}>
                            <Text style = {{fontSize : 20}}>Xin chào : {gmail}</Text>
                        </View>
                    </View>
                </View>

                {/* nhập công việc */}
                <View style = {{marginTop : 20,marginLeft : 30,flexDirection : 'row'}}>
                    <TextInput style = {styles.customTextInput} 
                    value= {task}
                    onChangeText = {text => setTask(text)}
                    placeholder='Nhập công việc cần làm'></TextInput>

                    <TouchableOpacity
                    onPress={handleAdd}
                    style = {styles.customAddButton}>
                        <Text style = {{fontWeight :'bold',fontSize : 25}}>+</Text>
                    </TouchableOpacity >
                </View>
            </View>

            {/* khúc dưới */}
            <View style = {{alignItems : 'center',flex : 1,marginTop : 30}}>
                <ScrollView style = {styles.list}>
                    <Text style = {{textAlign : 'center',fontSize : 25,marginBottom : 10}}>Tasks</Text>
                    {/* laod từng item */}
                    {
                        taskList.map((value,index) =>{
                            return (
                                <Task 
                                isChecked = {isChecked}
                                onClick = {() => setIsChecked(!isChecked)}
                                onDeleteTask = {() => handleDelete(index)}
                                code = {index} 
                                content = {value} 
                                number = {index + 1} />
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor : 'lightpink',
    },

    customTextInput:{
        backgroundColor : '#fff',
        height : 50,
        width : 250,
        borderRadius : 20,
        fontSize : 18,
    },

    customAddButton:{
        borderWidth : 1,
        width : 50,
        height : 50,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 100,
        backgroundColor : 'lightblue',
        marginLeft : 30
    },
    
    customQuitButton :{
        backgroundColor : '#e04c41',
        width : '25%',
        height : 40,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 20
    },

    hello : {
        justifyContent : 'center',
        width : '100%',
        borderRadius : 10,
        paddingLeft : 20
    },

    list : {
        backgroundColor : 'lightblue',
        height : '80%',
        width  : '90%',
        borderWidth : 1,
        borderRadius : 10,
        padding : 15
    }

})