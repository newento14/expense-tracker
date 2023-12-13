import { AntDesign } from '@expo/vector-icons'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import { Categories, IExpense } from '../types/expenses'
import { CategoryToColor, CategoryToIcon } from '../utils/CategoryToIcon'
import AsyncStorageService from '../utils/asyncStorageService'
import {
	convertToCurrency,
	convertTonNumber,
	formatDate,
} from '../utils/format'
import CategorySelector from './CategorySelector'
import Keyboard from './Keyboard'
interface ExpenseModalProps {
	item: IExpense
	setSelected: (item: IExpense | null) => void
	updateExpense: (oldExpense: IExpense, newExpense: IExpense) => void
}

const ExpenseModal: FC<ExpenseModalProps> = ({
	item,
	setSelected,
	updateExpense,
}) => {
	const [visible, setVisible] = React.useState(false)
	const [keyboardVisible, setKeyboardVisible] = React.useState(false)
	const [expense, setExpense] = React.useState<string>(
		convertToCurrency(item.expense)
	)

	const bg = CategoryToColor[item.category]

	const changeVisible = () => {
		setVisible(prev => !prev)
	}

	const changeKeyboardVisible = () => {
		setKeyboardVisible(prev => !prev)
	}

	const handleClose = () => {
		setSelected(null)
	}

	const handleChangeCategory = (newCategory: string) => {
		const newItem = { ...item, category: newCategory as Categories }
		AsyncStorageService.updateExpense(item, newItem)
		updateExpense(item, newItem)
		setSelected(newItem)
	}

	const handleConfirm = () => {
		const newItem = { ...item, expense: convertTonNumber(expense) }
		console.log(newItem)
		AsyncStorageService.updateExpense(item, newItem)
		updateExpense(item, newItem)
		setSelected(newItem)
		changeKeyboardVisible()
	}

	return (
		<Modal
			style={styles.modal}
			onSwipeComplete={handleClose}
			swipeDirection='down'
			isVisible={true}
		>
			<View style={styles.content}>
				<View style={[styles.header, { backgroundColor: bg }]}>
					<View style={styles.swipe_line_container}>
						<View style={styles.swipe_line} />
					</View>
				</View>
				<View style={styles.center}>
					<View style={styles.icon}>
						{CategoryToIcon({ category: item.category })}
					</View>
				</View>
				{item.comment !== '' ? (
					<Text style={styles.comment}>{item.comment}</Text>
				) : (
					<Text style={styles.comment}>No comment</Text>
				)}
				<CategorySelector
					item={item}
					changeCategory={handleChangeCategory}
					style={{ marginTop: 12 }}
				/>
				<Text style={styles.date}>{formatDate(item.date)}</Text>
				<View style={styles.currency_container}>
					<Text style={styles.currency}>{expense}</Text>
					<AntDesign
						onPress={changeKeyboardVisible}
						style={styles.edit_icon}
						name='edit'
						size={22}
						color='black'
					/>
				</View>
				<View style={{ height: '90%' }}>
					{keyboardVisible && (
						<Keyboard setExpense={setExpense} handleConfirm={handleConfirm} />
					)}
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		margin: 0,
		marginBottom: -50,
		justifyContent: 'flex-end',
	},
	content: {
		backgroundColor: '#fff',
		height: '80%',
		borderRadius: 50,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	header: {
		width: '100%',
		height: '12%',
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
	},
	icon: {
		borderRadius: 30,
		marginTop: -30,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.7,
		shadowRadius: 13.16,
		elevation: 20,
	},
	center: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	swipe_line_container: {
		width: '100%',
		height: 50,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	swipe_line: {
		width: '10%',
		height: 5,
		backgroundColor: 'gray',
		borderRadius: 5,
	},
	comment: {
		marginTop: 15,
	},
	date: {
		fontSize: 16,
		fontWeight: '500',
		marginTop: 15,
	},
	currency_container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	currency: {
		fontSize: 32,
		fontWeight: '600',
	},
	edit_icon: {
		position: 'absolute',
		right: '-10%',
	},
})

export default ExpenseModal
