import { useEffect, useState } from 'react';
import {View,Text,
        TouchableOpacity,
        TextInput,StyleSheet,
        Keyboard,
        Alert,
        ScrollView} from 'react-native';
import {Task} from './Task'
import {getFirestore,
        collection,
        updateDoc,
        getDocs,
        setDoc,
        doc,
        deleteDoc} from 'firebase/firestore'
import {app} from '../config/firebase'

export const ToDoList = ({ route, navigation }) =>{
    
    const gmail = route.params;//lấy gmail được chuyển từ trang Login
    const [task,setTask] = useState('');
    const [taskList,setTaskList] = useState([]);
    const db = getFirestore(app);//lấy data FireStore thông qua app

    //Nút đăng xuất
    const handleSignOut = () =>{
        setTaskList([]);
        navigation.navigate('Login')
    }

    //Nút thêm task
    const handleAdd = async () =>{
        if(task.length === 0) alert('Bạn chưa nhập công việc');
        else {
                        
            try{
                const timestamp = new Date().getTime();//lấy thời gian làm id
                const docRef = await setDoc(doc(db,`${gmail}`,`${timestamp}`), //tạo 1 document trong colection 'gamil' ở db có docId là timestamp
                {
                    id : timestamp,
                    task : task ,
                    state : false,
                })
                setTaskList([...taskList,{
                    id : timestamp,
                    task : task ,
                    state : false,
                }])

                setTask('');//sao khi nhập xong thì xóa ô nhập task
                Keyboard.dismiss()//ẩn bàn phím
                console.log("Document written with ID: ", timestamp);
            }
            catch(e){
                alert(e);
                console.error(e)
            }

        }
    }

    //nút xử lý check
    const hanleChecked =  (idx) =>{
        const taskListTmp = [...taskList];
        taskListTmp.forEach(async (item,i) =>{
            if(idx === i)
            {
                item.state = !item.state
                const docRef = doc(db,`${gmail}`,`${item.id}`) // lấy document có id là item.id}
                await updateDoc(docRef,{//update state của task
                    state : item.state,
                })
                
            }
        })
        setTaskList(taskListTmp);
    }

    //load các tasks có trong database mỗi khi gmail thay dổi
    useEffect(() =>{
        const readData = async () =>{
            const querySnapshot = await getDocs(collection(db, `${gmail}`));// lấy các document của collection gmail trong db
            const newTaskList = querySnapshot.docs.map((doc)=>(
                {
                    id : doc.data().id,
                    task : doc.data().task,
                    state : doc.data().state
                }
            ))
            setTaskList(newTaskList);
            console.log(newTaskList);
        }        
        readData()
    },[gmail])
    
    //xứ lý xóa task
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
                        deleteDoc(doc(db,`${gmail}`,`${taskList[index].id}`))//xõa document tại id taskList[index].id
                    }
                }
            ]
        );
    }

    return(
        <View style = {styles.container}>
        {/* phần nút thoát , ô nhập công việc và nút thêm công việc */}
        <View>
            {/* Nút thoát */}
            <View style = {{marginTop  : 50}}>
                <View style = {{flexDirection : 'row'}}>
                    <TouchableOpacity 
                    onPress={handleSignOut}
                    style = {styles.customQuitButton}>
                        <Text > &lt;= Sign Out</Text>
                    </TouchableOpacity>

                    <View style = {styles.hello}>
                        <Text style = {{fontSize : 20}}>Xin chào : {gmail}</Text>
                    </View>
                </View>
            </View>

            {/* nhập công việc và nút thêm công việc  */}
            <View style = {{marginTop : 20,marginLeft : 30,flexDirection : 'row'}}>
                {/* ô nhập công việc */}
                <TextInput style = {styles.customTextInput} 
                value= {task}
                onChangeText = {text => setTask(text)}
                placeholder='Nhập công việc cần làm'></TextInput>

                {/* nút thêm công việc */}
                <TouchableOpacity
                onPress={handleAdd}
                style = {styles.customAddButton}>
                    <Text style = {{fontWeight :'bold',fontSize : 25}}>+</Text>
                </TouchableOpacity >
            </View>
        </View>

        {/* phần Task List */}
        <View style = {{alignItems : 'center',flex : 1,marginTop : 30}}>
            <ScrollView style = {styles.list}>
                <Text style = {{textAlign : 'center',fontSize : 25,marginBottom : 10}}>Tasks</Text>
                {/* laod từng item */}
                {
                    taskList.map((value,index) =>{
                        return (
                            <Task 
                            //các thuộc tính của Task
                            isChecked = {value.state} //tick vào true,không tich là false
                            onClick = {() => hanleChecked(index)}//xử lý sự kiện click để set giá trị cho inChecked
                            onDeleteTask = {() => handleDelete(index)} // Nút xóa
                            code = {index} // index của task
                            content = {value.task} // nội dung của task
                            number = {index + 1} /> // số thứ tự của task để hiển thị
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
    //style input nhập công việc
    customTextInput:{
        backgroundColor : '#fff',
        height : 50,
        width : 250,
        borderRadius : 20,
        fontSize : 18,
    },
    //style cho nút thêm công việc
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

    //style cho nút đăng xuất
    customQuitButton :{
        backgroundColor : '#e04c41',
        width : '25%',
        height : 40,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 20
    },

    //style cho chữ xin chào : <tên đăng nhập>
    hello : {
        justifyContent : 'center',
        width : '100%',
        borderRadius : 10,
        paddingLeft : 15
    },

    //style cho list item
    list : {
        backgroundColor : 'lightblue',
        height : '80%',
        width  : '90%',
        borderWidth : 1,
        borderRadius : 10,
        padding : 15
    }

})