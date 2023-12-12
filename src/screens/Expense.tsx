import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { IExpense } from '../types/expenses'

interface ExpenseProps {
	route: any
}

const Expense: FC<ExpenseProps> = ({ route }) => {
	const { item } = route.params as { item: IExpense }

	return (
		<View>
			<Text>{item.expense}</Text>
		</View>
	)
}
export default Expense
