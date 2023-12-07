import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import Expenses from "./src/screens/Expenses";

import {Ionicons} from '@expo/vector-icons';
import Expense from "./src/screens/Expense";



const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTab.Navigator screenOptions={{
      headerStyle: {backgroundColor: '#fff'},
      headerTintColor: 'black',
      tabBarStyle: {backgroundColor: '#fff'},
      tabBarActiveTintColor: 'black',
    }}>
      <BottomTab.Screen name="Home" component={Home}
                        options={{
                          headerShown: false,
                          tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color}/>
                        }}/>
      <BottomTab.Screen name="Expenses" component={Expenses}
                        options={{
                          headerShown: false,
                          tabBarIcon: ({color, size}) => <Ionicons name="stats-chart" size={size} color={color}/>
                        }}/>
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown: false}} />
          <Stack.Screen name="Expense" component={Expense}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}