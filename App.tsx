import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Expenses from './src/screens/Expenses'
import Home from './src/screens/Home'

import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'react-native'

const BottomTab = createBottomTabNavigator()

export default function App() {
	return (
		<>
			<StatusBar barStyle='dark-content' />
			<NavigationContainer>
				<BottomTab.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: '#fff' },
						headerTintColor: 'black',
						tabBarStyle: { backgroundColor: '#fff' },
						tabBarActiveTintColor: 'black',
					}}
				>
					<BottomTab.Screen
						name='Home'
						component={Home}
						options={{
							headerShown: false,
							tabBarIcon: ({ color, size }) => (
								<Ionicons name='home' size={size} color={color} />
							),
						}}
					/>
					<BottomTab.Screen
						name='Expenses'
						component={Expenses}
						options={{
							headerShown: false,
							tabBarIcon: ({ color, size }) => (
								<Ionicons name='stats-chart' size={size} color={color} />
							),
						}}
					/>
				</BottomTab.Navigator>
			</NavigationContainer>
		</>
	)
}
