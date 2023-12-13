import { FC, memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { convertToCurrency } from '../utils/format'

interface ExpenseBlockProps {
	isLoading: boolean
	title: string
	expense: number
}

const ExpenseBlock: FC<ExpenseBlockProps> = memo(
	({ isLoading, title, expense }) => {
		return (
			<View style={styles.expense_block}>
				<Text style={{ textAlign: 'center' }}>{title}</Text>
				<View style={styles.currency}>
					{isLoading ? (
						<Text style={{ fontWeight: 'bold', fontSize: 22 }}>...</Text>
					) : (
						<Text style={{ fontWeight: 'bold', fontSize: 22 }}>
							{convertToCurrency(expense).split('.')[0]}
						</Text>
					)}
				</View>
			</View>
		)
	}
)

const styles = StyleSheet.create({
	expense_block: {
		backgroundColor: '#f5f5f5',
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

export default ExpenseBlock
