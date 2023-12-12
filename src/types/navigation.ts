import { IExpense } from './expenses'

export type RootStackParamList = {
	Home: undefined
	Expense: { expense: IExpense }
	Expenses: undefined
}
