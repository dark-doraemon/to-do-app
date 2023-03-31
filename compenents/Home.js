import { StyleSheet, Text, View ,Button,Image ,TouchableOpacity,TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';

export function Home({ navigation }) {
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
                title = "Go to Details"
                onPress={() => navigation.navigate('Details',{
                    id : item.id,
                    title : item.title,
                    price : item.price,
                    hinh : item.thumbnail
                })}
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
            <TextInput value={keyword} placeholder='Search' style={{height : 50}} onChangeText={text => setKeyword(text)}></TextInput>
            <Button title='Search' onPress={handleSearch} />
        </View>

        {isLoading ? (<Text>Đang load dữ liệu</Text>) : (
            <View>
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
