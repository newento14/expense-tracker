import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import Expenses from "./src/screens/Expenses";

import {Ionicons} from '@expo/vector-icons';


const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <BottomTab.Navigator screenOptions={{
          headerStyle: {backgroundColor: '#fff'},
          headerTintColor: 'black',
          tabBarStyle: {backgroundColor: '#fff'},
          headerShown: false,
          tabBarActiveTintColor: 'black',
        }}>
          <BottomTab.Screen name="Home" component={Home}
                            options={{
                              tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color}/>
                            }}/>
          <BottomTab.Screen name="Expenses" component={Expenses}
                            options={{
                              tabBarIcon: ({color, size}) => <Ionicons name="stats-chart" size={size} color={color}/>
                            }}/>
        </BottomTab.Navigator>
      </NavigationContainer>
    </>
  );
}