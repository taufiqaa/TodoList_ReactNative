import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { textAlign } from "styled-system";
import ListTodos from "./List-Todo";

export default function Login({navigation}) {
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
            const response = await axios.post('https://api.kontenbase.com/query/api/v1/e47c10a1-ec97-4a84-988c-3c146b726ef0/auth/login', body, config);
            // console.log(response);
            setIsLoading(false)           
            if (response) {
                await AsyncStorage.setItem('token', response.data.token);
            }
            
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                console.log(value);
                navigation.navigate("ListTodos")
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
            <Image source={{uri: "https://res.cloudinary.com/dmjxvbjlv/image/upload/v1661440516/Ways%20ToDo/login_register-image_wauzqt.png" }} style={{width: 250, height: 200, marginTop: 80, marginLeft: '10%' }} />
            <Text style={style.loginTitle}>Login</Text>
            <View>
                <TextInput 
                    style={style.textValue} 
                    placeholder="Email" 
                    onChangeText={(value) => handleOnChange('email', value)}
                    value={form.email}
                />
            </View>
            <View>
                <TextInput 
                    style={style.textValue} 
                    secureTextEntry={true} 
                    placeholder="Password" 
                    onChangeText={(value) => handleOnChange('password', value)}
                    value={form.password}
                />
            </View>
            <TouchableOpacity style={style.LoginButton} onPress={handleOnPress}>
                     <Text style={style.textButton}>Login</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate("Register")} style={{color:'black', textAlign:'center'}}>New in Ways ToDo? <Text style={style.linkNavigateToRegister}>Register</Text></Text>
        </View>
    );
}

const style = StyleSheet.create({
  section: {
    flex: 1,
    padding: 35
  },
  loginTitle: {
    marginTop: 40,
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
  LoginButton: {
    backgroundColor: '#FF5555',
    height: 45,
    width: '100%',
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 20,
    justifyContent: 'center'
  },
  linkNavigateToRegister :{
    color: 'red',
    textAlign: 'center',
  }
})
