import { FC, memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ExpenseBlockProps {
	isLoading: boolean
	title: string
	expense: number
}

const ExpenseBlock: FC<ExpenseBlockProps> = memo(
	({ isLoading, title, expense }) => {
		console.log('ExpenseBlock')
		return (
			<View style={styles.expense_block}>
				<Text style={{ textAlign: 'center' }}>{title}</Text>
				<View style={styles.currency}>
					<Text>$</Text>
					{isLoading ? (
						<Text style={{ fontWeight: 'bold', fontSize: 24 }}>...</Text>
					) : (
						<Text style={{ fontWeight: 'bold', fontSize: 24 }}>
							{expense >= 10000 ? Math.floor(expense) : expense}
						</Text>
					)}
				</View>
			</View>
		)
	}
)

const styles = StyleSheet.create({
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

export default ExpenseBlock
