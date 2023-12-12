import { FC } from 'react'
import {
	SafeAreaView,
	SectionList,
	StatusBar,
	StyleSheet,
	Text,
} from 'react-native'
import { IExpense } from '../types/expenses'
import ExpensesListItem from './ExpensesListItem'

interface ExpensesListProps {
	expenses: Record<string, IExpense[]>
}

const ExpensesList: FC<ExpensesListProps> = ({ expenses }) => {
	return (
		<SafeAreaView style={styles.container}>
			<SectionList
				sections={Object.keys(expenses).map(title => ({
					title: title,
					data: expenses[title],
				}))}
				keyExtractor={(item, index) => item.date + index}
				renderItem={({ item }) => <ExpensesListItem item={item} />}
				renderSectionHeader={({ section: { title } }) => (
					<Text style={styles.header}>{title}</Text>
				)}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		marginHorizontal: 16,
	},
	header: {
		alignSelf: 'center',
		fontSize: 14,
		fontWeight: 'bold',
		opacity: 0.5,
	},
})

export default ExpensesList
