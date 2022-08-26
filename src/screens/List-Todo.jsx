import { StatusBar } from "expo-status-bar";
import React,{useState, useEffect} from "react";
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Wrap } from "native-base";
import TodoCategory from "../components/TodoCategory-Dropdown";
import TodoStatus from "../components/TodoStatus-Dropdown";
import { marginRight } from "styled-system";

export default function ListTodos({navigation}) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    
    const getData = async() => {

        try {
            const token = await AsyncStorage.getItem('token');
            if (token === null) {
                navigation.navigate("Login")
            }
    
            const config = {
                headers: {
                  'Content-type': 'application/json',
                  Authorization: 'Bearer ' + token 
                },
            };
    
            setIsLoading(true);
    
            const res = await axios.get("https://api.kontenbase.com/query/api/v1/e47c10a1-ec97-4a84-988c-3c146b726ef0/auth/user", config)
            setData(res.data)
            setIsLoading(false);
        
        } catch (error) {
            console.log(error);    
        }
    }
    
    useEffect(() => {
        getData()
    },[])

    const handleLogout = async() => {
        await AsyncStorage.removeItem('token');
        navigation.navigate("Login")
    }

    const _renderItem = ({ item }) => {
        return (
            <View style={{textAlign: 'center', padding: 5, marginVertical: 10, borderWidth: 2, borderRadius: 8, width: '100%'}}>
                <Text>{item.firstName}</Text>
                <Text>{item.email}</Text>
            </View>
        );
    };

    return (
   
        <View style={style.section}>
            <StatusBar />
            <View style={{display: 'flex', flexDirection:'row',marginBottom: 50}}>
                <Text style={style.NameTitle}>Hi {data.firstName}</Text>
                <TouchableOpacity style={style.Profile}>
                </TouchableOpacity >
            </View>
            <View>
                <TextInput 
                    style={style.textSearchValue} 
                    placeholder="Search List" 
                    // onChangeText={(value) => handleOnChange('email', value)}
                    // value={form.email}
                />
            </View>
            
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <TextInput 
                    style={style.textDateValue} 
                    placeholder="Choose Date" 
                    // onChangeText={(value) => handleOnChange('email', value)}
                    // value={form.email}
                />
                <TodoCategory />
                <TodoStatus />
            </View>
            <View style={style.card}>
                <View style={{marginLeft: 20,marginRight: 20, marginTop:10}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>Study-Golang</Text>
                    <Text style={style.cardDescription}>Learn Golang to Improve 
                    fundamentals and familiarize with coding</Text>
                </View>
                <View style={{width: 50, marginTop: 10,}}>
                    <TouchableOpacity style={style.CardTitle}>
                        <Text style={{fontSize: 10, fontWeight: 'bold', textAlign: 'center'}}>Study</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={style.Omark}>
                        
                    </TouchableOpacity >
                </View>
            </View>
        </View>

    );
}

const style = StyleSheet.create({
  section: {
    flex: 1,
    padding: 35,
    paddingRight: 45,
    backgroundColor: 'white',
  },
  NameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    marginRight: 200,
  },
  Profile :{
    width : 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'grey',
    marginRight: 120,
  },
  textSearchValue: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 25,
    color: 'grey',
    padding: 10,
    borderColor: 'grey'
  },
  textDateValue: {
    height: 40,
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    color: 'grey',
    padding: 10,
    borderColor: 'grey',
    marginRight: 14,
  },
  card :{
    marginTop: 40,
    height: 90,
    width: 290,
    backgroundColor: `#DAEFFF`,
    borderRadius: 5,
    flexDirection: 'row',
  },
  cardDescription :{
    fontSize: 10,
    flexWrap: 'wrap',
    display: 'flex',
    width: 200,

  },
  CardTitle :{
    height: 15,
    width: 45,
    borderRadius: 5,
    backgroundColor: `#81C8FF`,
  },
  Omark:{
    height: 25,
    width: 25,
    borderRadius: 50,
    backgroundColor: `#D9D9D9`,
    marginTop: 10,
  }
})
