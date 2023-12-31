import { FC, memo } from 'react'
import {
	ActivityIndicator,
	SafeAreaView,
	SectionList,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { IExpense } from '../types/expenses'
import ExpensesListItem from './ExpensesListItem'

interface ExpensesListProps {
	expenses: Record<string, IExpense[]>
	setSelected: (item: IExpense | null) => void
	isLoading: boolean
}

const ExpensesList: FC<ExpensesListProps> = memo(
	({ expenses, setSelected, isLoading }) => {
		return isLoading ? (
			<View style={styles.empty_list_container}>
				<ActivityIndicator size={'large'} />
			</View>
		) : Object.keys(expenses).length === 0 ? (
			<View style={styles.empty_list_container}>
				<Text style={{ fontSize: 20, fontWeight: '700' }}>No expenses</Text>
			</View>
		) : (
			<SafeAreaView style={styles.container}>
				<SectionList
					sections={Object.keys(expenses).map(title => ({
						title: title,
						data: expenses[title],
					}))}
					keyExtractor={(item, index) => item.date + index}
					renderItem={({ item }) => (
						<ExpensesListItem item={item} setSelected={setSelected} />
					)}
					stickySectionHeadersEnabled={true}
					renderSectionHeader={({ section: { title } }) => (
						<View style={styles.header}>
							<Text style={styles.header_text}>{title}</Text>
						</View>
					)}
				/>
			</SafeAreaView>
		)
	}
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		marginHorizontal: 16,
	},
	header: {
		width: '100%',
		height: 40,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	header_text: {
		fontSize: 14,
		fontWeight: 'bold',
		opacity: 0.5,
	},
	empty_list_container: {
		width: '100%',
		height: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default ExpensesList
