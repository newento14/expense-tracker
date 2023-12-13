import React, { useEffect, useMemo } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import AddNewModal from '../components/AddNewModal'
import ExpenseBlock from '../components/ExpenseBlock'
import ExpenseModal from '../components/ExpenseModal'
import ExpensesList from '../components/ExpensesList'
import { IExpense, IExpenseByDate } from '../types/expenses'
import AsyncStorageService from '../utils/asyncStorageService'
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

	const groupedExpenses = React.useMemo(
		() => formatArray(expenses) as UnspecifiedObject,
		[expenses]
	)

	useEffect(() => {
		const getData = async (): Promise<void> => {
			const data = await AsyncStorageService.getExpenses()
			setExpenses(data)
			setLoading(false)
		}

		getData()
	}, [])

	useMemo(() => {
		const newExpensesByDay = calculateExpenses(expenses)
		setExpensesByDay(newExpensesByDay)
	}, [expenses])

	const handleChangeVisible = () => {
		setModalVisible(prev => !prev)
	}

	const handleAddExpense = (expense: IExpense) => {
		setExpenses(prev => [expense, ...prev])
	}

	const handleUpdateExpense = (oldExpense: IExpense, newExpense: IExpense) => {
		const newExpenses = expenses.map(expense => {
			return AsyncStorageService.compareExpense(expense, oldExpense)
				? newExpense
				: expense
		})
		setExpenses(newExpenses)
	}

	return (
		<View style={styles.main_container}>
			<Button title={'add'} onPress={handleChangeVisible} />
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
				<ExpenseBlock
					isLoading={loading}
					title={'Today'}
					expense={expensesByDay.today}
				/>
				<ExpenseBlock
					isLoading={loading}
					title={'Week'}
					expense={expensesByDay['7d']}
				/>
				<ExpenseBlock
					isLoading={loading}
					title={'Month'}
					expense={expensesByDay['30d']}
				/>
			</View>
			<ExpensesList
				isLoading={loading}
				expenses={groupedExpenses}
				setSelected={setSelectedExpense}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		backgroundColor: '#fff',
	},
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
})

export default Home
