import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import { IExpense } from '../types/expenses'

interface ExpenseModalProps {
	item: IExpense
	setSelected: (item: IExpense | null) => void
	visible: boolean
	setVisible: () => void
}

const ExpenseModal: FC<ExpenseModalProps> = ({ item, setSelected }) => {
	const handleClose = () => {
		setSelected(null)
	}

	return (
		<Modal
			style={{ margin: 0, marginBottom: -50, justifyContent: 'flex-end' }}
			onSwipeComplete={handleClose}
			swipeDirection='down'
			isVisible={true}
		>
			<View style={styles.modal}>
				<View style={styles.swipe_line_container}>
					<View style={styles.swipe_line} />
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#000',
		height: '80%',
		borderRadius: 50,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
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
})

export default ExpenseModal
