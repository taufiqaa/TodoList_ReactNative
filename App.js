import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider} from "native-base";

const Stack = createStackNavigator();
import Container from "./Container";

export default function App() {
  return (
    <NativeBaseProvider>
      <Container />
    </NativeBaseProvider>
  );
} 