import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import Expenses from "./src/screens/Expenses";


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTab.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#fff'  },
      headerTintColor: 'black',
      tabBarStyle: { backgroundColor: '#fff' },
    }}>
      <BottomTab.Screen name="Home" component={Home}/>
      <BottomTab.Screen name="Expenses" component={Expenses}/>
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}