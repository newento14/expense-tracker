import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import { Categories, IExpense } from '../types/expenses'

import AsyncStorageService from '../utils/asyncStorageService'
import { convertTonNumber } from '../utils/format'
import CategorySelect from './CategorySelector'
import Keyboard from './Keyboard'

const InitialObject: IExpense = {
	category: Categories.Other,
	expense: 0,
	date: new Date().toLocaleDateString('en-GB'),
	comment: '',
}

interface AddNewModalProps {
	modalVisible: boolean
	handleChangeVisible: () => void
	pushNewExpense: (expense: IExpense) => void
}

const AddNewModal: React.FC<AddNewModalProps> = ({
	handleChangeVisible,
	modalVisible,
	pushNewExpense,
}) => {
	const [state, setState] = useState<IExpense>(InitialObject)
	const [expense, setExpense] = useState<string>('$0')

	const handleClose = () => {
		setState(InitialObject)
		setExpense('$0')
		handleChangeVisible()
	}

	const handleCategoryChange = (newCategory: string) => {
		setState(prev => ({ ...prev, category: newCategory as Categories }))
	}

	const handleConfirm = () => {
		if (expense === '$0' || expense === '$') {
			return
		}
		const newExpense: IExpense = {
			...state,
			expense: convertTonNumber(expense),
		}
		AsyncStorageService.addExpense(newExpense)
		pushNewExpense(newExpense)
		handleClose()
	}

	return (
		<Modal
			style={{ margin: 0, marginBottom: -50, justifyContent: 'flex-end' }}
			onSwipeComplete={handleClose}
			swipeDirection='down'
			isVisible={modalVisible}
		>
			<View style={styles.modal}>
				<View style={styles.swipe_line_container}>
					<View style={styles.swipe_line} />
				</View>
				<CategorySelect item={state} changeCategory={handleCategoryChange} />
				<Text style={{ opacity: 0.6 }}>Expenses</Text>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'flex-end',
					}}
				>
					<Text style={{ fontWeight: 'bold', fontSize: 36, height: '85%' }}>
						{expense}
					</Text>
				</View>
				<TextInput
					style={{ margin: 5, textAlign: 'center' }}
					placeholder={'Add comment'}
					value={state.comment}
					onChangeText={text => setState(prev => ({ ...prev, comment: text }))}
				/>
				<Keyboard setExpense={setExpense} handleConfirm={handleConfirm} />
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#fff',
		height: '70%',
		width: '100%',
		borderRadius: 50,
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

export default AddNewModal
