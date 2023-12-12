import { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IExpense } from '../types/expenses'
import { CategoryToIcon } from '../utils/CategoryToIcon'

interface ExpensesListItemProps {
	item: IExpense
}

const ExpensesListItem: FunctionComponent<ExpensesListItemProps> = ({
	item,
}) => {
	return (
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
					<Text style={{ height: '55%' }}>$</Text>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 26,
							height: '100%',
						}}
					>
						{item.expense}
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
