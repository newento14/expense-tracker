import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useLayoutEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import AddNewModal from '../components/AddNewModal'
import ExpenseModal from '../components/ExpenseModal'
import ExpensesList from '../components/ExpensesList'
import { IExpense, IExpenseByDate } from '../types/expenses'
import {
	default as AsyncStorageService,
	default as asyncStorageService,
} from '../utils/asyncStorageService'
import { calculateExpenses, formatArray } from '../utils/calculate'

type UnspecifiedObject = Record<string, IExpense[]>

const Home = () => {
	const [loading, setLoading] = React.useState(true)
	const [expenses, setExpenses] = React.useState<IExpense[]>([])
	const [modalVisible, setModalVisible] = React.useState(false)
	const [expensesByDay, setExpensesByDay] = React.useState({} as IExpenseByDate)

	const [selectedExpense, setSelectedExpense] = React.useState<IExpense | null>(
		null
	)
	const [expenseModalVisible, setExpenseModalVisible] = React.useState(false)

	const getData = async (): Promise<void> => {
		const data = await AsyncStorageService.getExpenses()
		setExpensesByDay(calculateExpenses(data))
		setExpenses(data)
		setLoading(false)
	}

	useEffect(() => {
		getData()
	}, [])

	useLayoutEffect(() => {
		setExpensesByDay(calculateExpenses(expenses))
	}, [expenses])

	const handleChangeVisible = () => {
		setModalVisible(prev => !prev)
	}

	const handleAddExpense = (expense: IExpense) => {
		setExpenses(prev => [expense, ...prev])
	}

	const handleUpdateExpense = (oldExpense: IExpense, newExpense: IExpense) => {
		const newExpenses = expenses.map(expense => {
			return asyncStorageService.compareExpense(expense, oldExpense)
				? newExpense
				: expense
		})
		setExpenses(newExpenses)
	}

	const handleClearStorage = async () => {
		try {
			await AsyncStorage.removeItem('expenses')
		} catch (e) {
			console.error(e)
		}
	}

	const groupedExpenses = React.useMemo(
		() => formatArray(expenses) as UnspecifiedObject,
		[expenses]
	)

	return (
		<>
			<Button title={'add'} onPress={handleChangeVisible} />
			<Button title={'clear'} onPress={handleClearStorage} />
			<AddNewModal
				modalVisible={modalVisible}
				handleChangeVisible={handleChangeVisible}
				pushNewExpense={handleAddExpense}
			/>
			{selectedExpense && (
				<ExpenseModal
					item={selectedExpense}
					setSelected={setSelectedExpense}
					updateExpense={handleUpdateExpense}
				/>
			)}
			<View style={styles.expense_block_list}>
				<View style={styles.expense_block}>
					<Text style={{ textAlign: 'center' }}>Day</Text>
					<View style={styles.currency}>
						<Text>$</Text>
						{loading ? (
							<Text style={{ fontWeight: 'bold', fontSize: 24 }}>...</Text>
						) : (
							<Text style={{ fontWeight: 'bold', fontSize: 24 }}>
								{expensesByDay.Today}
							</Text>
						)}
					</View>
				</View>
				<View style={styles.expense_block}>
					<Text style={{ textAlign: 'center' }}>Week</Text>
					<View style={styles.currency}>
						<Text>$</Text>
						{loading ? (
							<Text style={{ fontWeight: 'bold', fontSize: 24 }}>...</Text>
						) : (
							<Text style={{ fontWeight: 'bold', fontSize: 24 }}>
								{expensesByDay['7d']}
							</Text>
						)}
					</View>
				</View>
				<View style={styles.expense_block}>
					<Text style={{ textAlign: 'center' }}>Month</Text>
					<View style={styles.currency}>
						<Text>$</Text>
						{loading ? (
							<Text style={{ fontWeight: 'bold', fontSize: 24 }}>...</Text>
						) : (
							<Text style={{ fontWeight: 'bold', fontSize: 24 }}>
								{expensesByDay['30d']}
							</Text>
						)}
					</View>
				</View>
			</View>
			<ExpensesList
				isLoading={loading}
				expenses={groupedExpenses}
				setSelected={setSelectedExpense}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	empty_list_container: {
		width: '100%',
		height: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
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
