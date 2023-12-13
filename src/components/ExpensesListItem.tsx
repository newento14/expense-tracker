import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IExpense } from '../types/expenses'
import { CategoryToIcon } from '../utils/CategoryToIcon'
import { convertToCurrency } from '../utils/format'

interface ExpensesListItemProps {
	item: IExpense
	setSelected: (item: IExpense | null) => void
}

const ExpensesListItem: FC<ExpensesListItemProps> = ({ item, setSelected }) => {
	let expense = convertToCurrency(item.expense)
	if (expense.endsWith('.00')) {
		expense = expense.slice(0, -3)
	}

	return (
		<TouchableOpacity style={styles.item} onPress={() => setSelected(item)}>
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
				<Text style={[styles.title, { fontWeight: '500', fontSize: 18 }]}>
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
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 23,
							height: '100%',
						}}
					>
						{expense}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
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
})

export default ExpensesListItem
