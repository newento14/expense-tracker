import { IExpense, IExpenseByDate } from '../types/expenses'

export const calculateExpenses = (expenses: IExpense[]): IExpenseByDate => {
	const [day, month, year] = new Date().toLocaleDateString('en-GB').split('/')
	let today = 0
	let sevenDays = 0
	let thirtyDays = 0

	expenses.forEach(expense => {
		const [expenseDay, expenseMonth, expenseYear] = expense.date.split('/')
		if (expenseYear === year) {
			if (expenseMonth === month) {
				if (Number(expenseDay) >= Number(day) - 7) {
					sevenDays += expense.expense
				}
				if (Number(expenseDay) >= Number(day) - 30) {
					thirtyDays += expense.expense
				}
				if (expenseDay === day) {
					today += expense.expense
				}
			}
		}
	})

	return {
		today: today,
		'7d': sevenDays,
		'30d': thirtyDays,
	}
}

export const formatArray = (
	expenses: IExpense[]
): { Today?: IExpense[]; Yesterday?: IExpense[] } => {
	const [day, month, year] = new Date().toLocaleDateString('en-GB').split('/')
	const today = [] as IExpense[]
	const yesterday = [] as IExpense[]
	type UnspecifiedObject = Record<string, IExpense[]>

	const other: UnspecifiedObject = {}

	expenses.forEach(expense => {
		const [expenseDay, expenseMonth, expenseYear] = expense.date.split('/')
		if (expenseYear === year) {
			if (expenseMonth === month) {
				if (expenseDay === day) {
					today.push(expense)
				} else if (Number(expenseDay) === Number(day) - 1) {
					yesterday.push(expense)
				} else if (Number(expenseDay) < Number(day) - 1) {
					if (other[expense.date]) {
						other[expense.date].push(expense)
					} else {
						other[expense.date] = [expense]
					}
				}
			} else if (Number(expenseMonth) < Number(month)) {
				if (other[expense.date]) {
					other[expense.date].push(expense)
				} else {
					other[expense.date] = [expense]
				}
			}
		} else if (Number(expenseYear) < Number(year)) {
			if (other[expense.date]) {
				other[expense.date].push(expense)
			} else {
				other[expense.date] = [expense]
			}
		}
	})

	const sortedKeys = Object.keys(other).sort((a, b) => {
		const [aDay, aMonth, aYear] = a.split('/')
		const [bDay, bMonth, bYear] = b.split('/')
		if (aYear === bYear) {
			if (aMonth === bMonth) {
				return Number(bDay) - Number(aDay)
			}
			return Number(bMonth) - Number(aMonth)
		}
		return Number(bYear) - Number(aYear)
	})

	const sortedOther: UnspecifiedObject = {}

	for (const key of sortedKeys) {
		sortedOther[key] = other[key]
	}

	return {
		...(today.length > 0 && { Today: today }),
		...(yesterday.length > 0 && { Yesterday: yesterday }),
		...sortedOther,
	}
}
