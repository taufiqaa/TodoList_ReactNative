import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { textAlign } from "styled-system";

export default function AddCategory({navigation}) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    
    const handleOnChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleOnPress = async () => {
        try {
            const config = {
                headers: {
                'Content-type': 'application/json',
                },
            };
        
            const body = JSON.stringify(form);
            setIsLoading(true)
            const response = await axios.post('https://api.kontenbase.com/query/api/v1/e47c10a1-ec97-4a84-988c-3c146b726ef0/Login', body, config);
            // console.log(response);
            setIsLoading(false)           
            if (response) {
                await AsyncStorage.setItem('token', response.data.token);
            }
            
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                console.log(value);
                navigation.navigate("Users")
            }
                
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            setIsLoading(false)           

        }
    };

    return (
        <View style={style.section}>
            <StatusBar />
            <Text style={style.CategoryTitle}>Add Category</Text>
            <View>
                <TextInput 
                    style={style.textValue} 
                    placeholder="Name" 
                    onChangeText={(value) => handleOnChange('email', value)}
                    value={form.email}
                />
            </View>
            <TouchableOpacity style={style.CategoryButton} onPress={handleOnPress}>
                     <Text style={style.textButton}>Add Category</Text>
            </TouchableOpacity>
            <Text style={style.CategoryTitle}>List Category</Text>
        </View>
    );
}

const style = StyleSheet.create({
  section: {
    flex: 1,
    padding: 35
  },
  CategoryTitle: {
    marginTop: 50,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20
  },
  textValue: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 25,
    color: 'grey',
    padding: 10,
    borderColor: 'grey'
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  CategoryButton: {
    backgroundColor: '#FF5555',
    height: 45,
    width: '100%',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center'
  },
  linkNavigateToRegister :{
    color: 'red',
    textAlign: 'center',
  }
})
