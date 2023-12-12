import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import { IExpense } from '../types/expenses'
import { CategoryToColor, CategoryToIcon } from '../utils/CategoryToIcon'

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
				<View
					style={[
						styles.header,
						{ backgroundColor: CategoryToColor[item.category] },
					]}
				>
					<View style={styles.swipe_line_container}>
						<View style={styles.swipe_line} />
					</View>
				</View>
				<View style={styles.center}>
					<View style={styles.icon}>
						{CategoryToIcon({ category: item.category })}
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
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
})

export default ExpenseModal
