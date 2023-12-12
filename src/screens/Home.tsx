import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useRef } from 'react'
import {
	Button,
	SafeAreaView,
	SectionList,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import AddNewModal from '../components/AddNewModal'
import { IExpense, IExpenseByDate } from '../types/expenses'
import { CategoryToIcon } from '../utils/CategoryToIcon'
import { calculateExpenses, formatArray } from '../utils/calculate'

type UnspecifiedObject = Record<string, IExpense[]>

const Home = () => {
	const [expenses, setExpenses] = React.useState<UnspecifiedObject>({})
	const [modalVisible, setModalVisible] = React.useState(false)
	const expensesByDay = useRef({} as IExpenseByDate)

	const getData = async (): Promise<void> => {
		try {
			const value = await AsyncStorage.getItem('expenses')
			const data = (await JSON.parse(value || '[]')) as IExpense[]
			expensesByDay.current = calculateExpenses(data)
			setExpenses(formatArray(data))
		} catch (e) {
			console.error(e)
			setExpenses({})
		}
	}

	useEffect(() => {
		getData()
	}, [])

	const handleChangeVisible = () => {
		setModalVisible(prev => !prev)
	}

	const handleAddExpense = (expense: IExpense) => {
		setExpenses({ ...expenses, Today: [expense, ...expenses.Today] })
	}

	return (
		<>
			<Button title={'add'} onPress={handleChangeVisible} />
			<AddNewModal
				modalVisible={modalVisible}
				handleChangeVisible={handleChangeVisible}
				pushNewExpense={handleAddExpense}
			/>
			<View style={styles.expense_block_list}>
				<View style={styles.expense_block}>
					<Text style={{ textAlign: 'center' }}>Day</Text>
					<View style={styles.currency}>
						<Text>$</Text>
						<Text style={{ fontWeight: 'bold', fontSize: 24 }}>
							{expensesByDay.current.Today}
						</Text>
					</View>
				</View>
				<View style={styles.expense_block}>
					<Text style={{ textAlign: 'center' }}>Week</Text>
					<View style={styles.currency}>
						<Text>$</Text>
						<Text style={{ fontWeight: 'bold', fontSize: 24 }}>
							{expensesByDay.current['7d']}
						</Text>
					</View>
				</View>
				<View style={styles.expense_block}>
					<Text style={{ textAlign: 'center' }}>Month</Text>
					<View style={styles.currency}>
						<Text>$</Text>
						<Text style={{ fontWeight: 'bold', fontSize: 24 }}>
							{expensesByDay.current['30d']}
						</Text>
					</View>
				</View>
			</View>
			<SafeAreaView style={styles.container}>
				<SectionList
					sections={Object.keys(expenses).map(title => ({
						title: title,
						data: expenses[title],
					}))}
					keyExtractor={(item, index) => item.date + index}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.item}>
							<CategoryToIcon category={item.category} />
							<View
								style={{
									justifyContent: 'space-between',
									display: 'flex',
									flexDirection: 'row',
									width: '80%',
									height: 30,
									alignItems: 'center',
								}}
							>
								<Text
									style={[styles.title, { fontWeight: '500', fontSize: 18 }]}
								>
									{item.category}
								</Text>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										height: '100%',
									}}
								>
									<Text style={{ height: '55%' }}>$</Text>
									<Text
										style={{ fontWeight: 'bold', fontSize: 26, height: '100%' }}
									>
										{item.expense}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					)}
					renderSectionHeader={({ section: { title } }) => (
						<Text style={styles.header}>{title}</Text>
					)}
				/>
			</SafeAreaView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		marginHorizontal: 16,
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 20,
		marginVertical: 8,
	},
	header: {
		alignSelf: 'center',
		fontSize: 14,
		fontWeight: 'bold',
		opacity: 0.5,
	},
	title: {
		marginLeft: 12,
		fontSize: 24,
	},
	expense_block_list: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		gap: 20,
		width: '100%',
		height: 100,
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 20,
	},
	expense_block: {
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
		borderRadius: 22,
		minWidth: '27%',
	},
	currency: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		height: '41%',
	},
})

export default Home
