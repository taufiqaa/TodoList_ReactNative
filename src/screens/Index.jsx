import { StatusBar } from "expo-status-bar";
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Button } from "react-native";



export default function Index({navigation}){

    return(
        <View style={style.section}>
            <StatusBar />
            <Image source={{uri: "https://res.cloudinary.com/dmjxvbjlv/image/upload/v1661438528/Ways%20ToDo/index-image_etavqh.png" }} style={{width: 250, height: 200, marginTop: 80, marginLeft: '10%' }} />
            <Text style={{fontSize:40, marginTop:0, textAlign:'center'}}>Ways <Text style={{color:`#B82020`}}>To</Text>
            <Text style={{color: `#FF5555`}}>Do</Text></Text>
            <Text style={{fontSize:15, textAlign: 'center', marginTop:15}}> Write your activity and finish your activity</Text>
            <Text style={{marginTop: 5, fontSize:15, textAlign: 'center'}}>Fast, Simple and Easy to Use</Text>
            <TouchableOpacity style={style.LoginPage} onPress={()=> navigation.navigate("Login")}>
                <Text style={style.textLoginPage}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.RegisterPage} onPress={()=> navigation.navigate("Register")}>
                <Text style={style.textRegisterPage}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    section: {
        padding : 35,
    },
    LoginPage: {
        backgroundColor: '#FF5555',
        height: 50,
        width: '100%',
        borderRadius: 5,
        marginTop: 40,
        marginBottom: 10,
        justifyContent: 'center'
      },
      textLoginPage :{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign : 'center',
      },
      RegisterPage: {
        backgroundColor: 'rgba(0, 0, 0, 0.31)',
        height: 50,
        width: '100%',
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 10,
        justifyContent: 'center'
      },
      textRegisterPage :{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign : 'center',
      }
})
