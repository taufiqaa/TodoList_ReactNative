import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import TodoCategory from "../components/TodoCategory-Dropdown";
import TodoStatus from "../components/TodoStatus-Dropdown";
import { display } from "styled-system";


export default function DetailList({navigation}) {
    return (
        <View style={style.section}>
            <StatusBar />
            <View style={style.card}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: 20,marginRight: 20, marginTop:10}}>
                        <Text style={{fontWeight: 'bold', marginBottom: 5, width: 200}}>Study-Golang</Text>
                    </View>
                <View style={{width: 50, marginTop: 10,}}>
                    <TouchableOpacity style={style.CardTitle}>
                        <Text style={{fontSize: 10, fontWeight: 'bold', textAlign: 'center'}}>Study</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={style.Omark}>
                        
                    </TouchableOpacity >
                </View>
                <View>
                </View>
            </View>
            <Text style={style.cardDescription}>Learn Golang to Improve 
                fundamentals and familiarize with coding</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
section :{
    padding: 35,
},
  card :{
    height: 600,
    width: 290,
    backgroundColor: `#DAEFFF`,
    borderRadius: 5,
  },
  cardDescription :{
    fontSize: 10,
    flexWrap: 'wrap',
    display: 'flex',
    width: 260,
    marginLeft: 20,
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
