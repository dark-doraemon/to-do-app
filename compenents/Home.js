import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,Image ,TouchableOpacity,TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {Profile} from './compenents/Profile';
import {Home} from './compenents/Home';
import { FlatList } from 'react-native-gesture-handler';

let Stack =createNativeStackNavigator();
let Tab = createBottomTabNavigator();
let Drawer = createDrawerNavigator();



export function App() {
    const [isLoading,setIsLoading] = useState(true);
    const [products,setProducts] = useState([]);
    const [keyword,setKeyword] = useState('');
    const handleSearch = () =>{
        setIsLoading(true);
        if(keyword.length >= 0)
        {
          fetch(`https://dummyjson.com/products/search?q=${keyword}`)
          //fetch(`https://dummyjson.com/products/search?q=` + keyword)
          
          .then(res => res.json())
          .then(res => {
          setProducts(res.products);
          setIsLoading(false);})
        }
      }

    const ItemClick =({item})=>{
        return (
            <View>
                <TouchableOpacity
                onPress={ () => {
                    console.log(item.id);
                }}
                >
                <Text>{item.id}</Text>
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
                <Image source={{uri : item.thumbnail}} style = {{width : 300,height : 200}} />
            </TouchableOpacity>
            </View>
        )
    }

    useEffect(()=>{
        fetch(`https://dummyjson.com/products`)
        .then(respone => respone.json())
        .then(result =>{
            setProducts(result.products)
        })
        setIsLoading(false);
    },[])


return (
   <View style = {styles.container }>
        <View >
            <TextInput value={keyword} placeholder='Search' style={{height : 30}} onChangeText={text => setKeyword(text)}></TextInput>
            <Button title='Search' onPress={handleSearch} />
        </View>

        {isLoading ? (<Text>Đang load dữ liệu</Text>) : (
            <View>
                {/* {products.map(item =>(
                    <View>
                        <Text>{item.id}</Text>
                        <Text>{item.title}</Text>
                        <Text>{item.price}</Text>
                        <Image source={{uri : item.thumbnail}} style = {{width : 100,height : 100}} />
                    </View>
                ))} */}
                <FlatList 
                data={products}
                renderItem = {ItemClick}
                />
            </View>
        )}
   </View>
    
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
});
