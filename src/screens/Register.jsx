import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
// import { paddingLeft } from "styled-system";

export default function Register({navigation}) {
    const [form, setForm] = useState({
        firstName: '',
        email: '',
        password: '',
    });
    
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
        
            const response = await axios.post('https://api.kontenbase.com/query/api/v1/e47c10a1-ec97-4a84-988c-3c146b726ef0/auth/register', body, config);
            console.log(response);
            
            if (response) {
                await AsyncStorage.setItem('token', response.data.token);
            }
                
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                console.log(value);
                navigation.navigate("Login")
            }
                
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };

    return (
        <View style={style.section}>
            <StatusBar />
            <Image source={{uri: "https://res.cloudinary.com/dmjxvbjlv/image/upload/v1661440516/Ways%20ToDo/login_register-image_wauzqt.png" }} style={{width: 250, height: 200, marginTop: 20, marginLeft: '10%' }} />
            <Text style={style.registerTitle}>Register</Text>            
            <View>
                <TextInput 
                    style={style.textValue} 
                    placeholder="Name" 
                    onChangeText={(value) => handleOnChange('firstName', value)}
                    value={form.firstName}
                />
            </View>
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
            <TouchableOpacity style={style.RegisterButton} onPress={handleOnPress}>
                <Text style={style.textButton}>Register</Text>
            </TouchableOpacity>
                <Text style={{color:'black', textAlign:'center'}}>Already have an account? <Text onPress={() => navigation.navigate("Login")} style={style.linkNavigateToLogin}>Login</Text></Text>
        </View>
    );
}

const style = StyleSheet.create({
  section: {
    flex: 1,
    padding: 35,
  },
  registerTitle: {
    marginTop: 60,
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
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
  RegisterButton: {
    backgroundColor: '#FF5555',
    height: 45,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  textNavigateLogin :{
    textAlign: 'center',
  },
  linkNavigateToLogin :{
    color: 'red',
    textAlign: 'center',
  }
})
