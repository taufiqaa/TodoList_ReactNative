import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ListTodos from "./src/screens/List-Todo";
import AddList from "./src/screens/AddList";
import AddCategory from "./src/screens/AddCategory";
import Index from "./src/screens/Index";
import Register from "./src/screens/register";
import Login from "./src/screens/Login";
import DetailList from "./src/screens/Detail-List";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function BottomTab() {

  return (
    <Tab.Navigator
      initialRouteName="Index"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "ListTodos") {
            iconName = focused ? "ios-apps" : "ios-apps-outline";
          } else if (route.name === "AddList") {
            iconName = focused
              ? "ios-copy"
              : "ios-copy-outline";
          } else if (route.name === "AddCategory") {
            iconName = focused ? "ios-list-circle" : "ios-list-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="ListTodos" component={ListTodos} />
      <Tab.Screen name="AddList" component={AddList} />
      <Tab.Screen name="AddCategory" component={AddCategory} />
    </Tab.Navigator>
  );
}

export default function Container() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Index" component={Index} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="DetailList" component={DetailList} options={{headerShown: false}}/>
      <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
