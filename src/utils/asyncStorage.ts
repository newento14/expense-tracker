import AsyncStorage from '@react-native-async-storage/async-storage'
import { IExpense } from '../types/expenses'

const EXPENSES_KEY = 'expenses'

export default class AsyncStorageService {
	static async addExpense(expense: IExpense) {
		try {
			let expenses = await AsyncStorage.getItem(EXPENSES_KEY)

			let expensesArray: IExpense[] = expenses ? JSON.parse(expenses) : []

			expensesArray.unshift(expense)

			await AsyncStorage.setItem('expenses', JSON.stringify(expensesArray))
		} catch (error) {
			console.error('Error adding expense: ', error)
		}
	}

	static async getExpenses() {
		try {
			const value = await AsyncStorage.getItem(EXPENSES_KEY)
			const data = (await JSON.parse(value || '[]')) as IExpense[]
			return data
		} catch (e) {
			console.log(e)
			return []
		}
	}

	static async deleteExpense(expense: IExpense) {
		try {
			const expenses = await AsyncStorage.getItem(EXPENSES_KEY)
			let expensesArray: IExpense[] = expenses ? JSON.parse(expenses) : []

			expensesArray = expensesArray.filter(
				expenseItem => !this.compareExpense(expenseItem, expense)
			)

			await AsyncStorage.setItem('expenses', JSON.stringify(expensesArray))
		} catch (e) {
			console.log(e)
		}
	}

	private static compareExpense(item1: IExpense, item2: IExpense): boolean {
		for (const key in item1) {
			if (item1[key] !== item2[key]) {
				return false
			}
		}
		return true
	}
}
