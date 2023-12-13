import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import { Categories, IExpense } from '../types/expenses'

import { Ionicons } from '@expo/vector-icons'
import AsyncStorageService from '../utils/asyncStorageService'
import AddNewModalButton from './AddNewModalButton'
import CategorySelect from './CategorySelector'

const InitialObject: IExpense = {
	category: Categories.Other,
	expense: 0,
	date: new Date().toLocaleDateString('en-GB'),
	comment: '',
}

const buttons: string[][] = [
	['1', '2', '3'],
	['4', '5', '6'],
	['7', '8', '9'],
	['.', '0'],
]

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
	const [expense, setExpense] = useState<string>('0')

	const handleClose = () => {
		setState(InitialObject)
		setExpense('0')
		handleChangeVisible()
	}

	const handleCategoryChange = (newCategory: string) => {
		setState(prev => ({ ...prev, category: newCategory as Categories }))
	}

	const handleButtonPress = (value: string) =>
		React.useCallback(() => {
			setExpense(prevValue => {
				if (prevValue === '0') {
					return value
				}

				if (value === '.' && prevValue.indexOf('.') === -1) {
					return prevValue + value
				}
				if (prevValue.lastIndexOf('.') === -1) {
					if (prevValue.length > 5) {
						return prevValue
					}
					return prevValue + value
				} else if (prevValue.length > 8) {
					return prevValue
				}
				return prevValue + value
			})
		}, [])

	const handleRemoveLast = React.useCallback(() => {
		setExpense(prevValue => prevValue.slice(0, -1))
	}, [])

	const handleConfirm = () => {
		const newExpense: IExpense = {
			...state,
			expense: parseFloat(expense),
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
					<Text style={{ fontSize: 18 }}>$</Text>
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
				<View style={styles.grid}>
					<View style={styles.row}>
						{buttons[0].map((item, index) => (
							<AddNewModalButton
								key={index}
								title={item}
								handleButtonPress={handleButtonPress(item)}
							/>
						))}
						<AddNewModalButton
							title={
								<Ionicons name='backspace-outline' size={24} color='black' />
							}
							handleButtonPress={handleRemoveLast}
							style={{ backgroundColor: '#ffe0d7' }}
						/>
					</View>
					<View style={styles.row}>
						{buttons[1].map((item, index) => (
							<AddNewModalButton
								key={index}
								title={item}
								handleButtonPress={handleButtonPress(item)}
							/>
						))}
						<AddNewModalButton
							title={
								<Ionicons name='md-calendar-sharp' size={24} color='black' />
							}
							style={{ backgroundColor: '#e0ebfe' }}
							handleButtonPress={() => {}}
						/>
					</View>
					<View style={styles.row}>
						{buttons[2].map((item, index) => (
							<AddNewModalButton
								key={index}
								title={item}
								handleButtonPress={handleButtonPress(item)}
							/>
						))}
						<AddNewModalButton
							title={'$'}
							handleButtonPress={() => {}}
							style={{ backgroundColor: '#fff8da' }}
						/>
					</View>
					<View style={styles.row}>
						{buttons[3].map((item, index) => (
							<AddNewModalButton
								key={index}
								title={item}
								handleButtonPress={handleButtonPress(item)}
							/>
						))}
						<AddNewModalButton
							title={<Ionicons name='checkmark' size={36} color='white' />}
							handleButtonPress={handleConfirm}
							style={styles.confirmButton}
						/>
					</View>
				</View>
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
	grid: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 'auto',
		height: '60%',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '90%',
		height: '25%',
	},
	confirmButton: {
		width: '46%',
		backgroundColor: 'black',
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
