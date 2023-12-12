import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import Modal from 'react-native-modal'
import RNPickerSelect from 'react-native-picker-select'
import { Categories, IExpense } from '../types/expenses'

import { Ionicons } from '@expo/vector-icons'
import AsyncStorageService from '../utils/asyncStorage'

const categories = [
	{ label: '🍗 Food', value: 'Food' },
	{ label: '🏠 Housing', value: 'Housing' },
	{ label: '🚕 Transport', value: 'Transport' },
	{ label: '👕 Clothing', value: 'Clothing' },
	{ label: '💊 Healthcare', value: 'Healthcare' },
	{ label: '📚 Education', value: 'Education' },
	{ label: '🎉 Entertainment', value: 'Entertainment' },
]

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
	const [expense, setExpense] = useState<string>('0')

	const handleClose = () => {
		setState(InitialObject)
		setExpense('0')
		handleChangeVisible()
	}

	const handleCategoryChange = (value: string) => {
		setState(prev => ({ ...prev, category: value as Categories }))
	}

	const handleButtonPress = (value: string) => {
		if (expense === '0') {
			setExpense(value)
			return
		}
		setExpense(prevValue => {
			if (prevValue.length > 5) return prevValue
			return prevValue + value
		})
	}

	const handleRemoveLast = () => {
		setExpense(prevValue => prevValue.slice(0, -1))
	}

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
				<RNPickerSelect
					placeholder={{ label: 'Other', value: 'other' }}
					onValueChange={handleCategoryChange}
					items={categories}
				/>
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
					style={{ margin: 5 }}
					placeholder={'Add comment'}
					value={state.comment}
					onChangeText={text => setState(prev => ({ ...prev, comment: text }))}
				/>
				<View style={styles.grid}>
					<View style={styles.row}>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('1')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>1</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('2')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>2</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('3')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>3</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={handleRemoveLast}
							style={[styles.button, { backgroundColor: '#ffe0d7' }]}
						>
							<Ionicons name='backspace' size={24} color='black' />
						</TouchableOpacity>
					</View>
					<View style={styles.row}>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('4')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>4</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('5')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>5</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('6')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>6</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							style={[styles.button, { backgroundColor: '#e0ebfe' }]}
						>
							<Ionicons name='md-calendar-sharp' size={24} color='black' />
						</TouchableOpacity>
					</View>
					<View style={styles.row}>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('7')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>7</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('8')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>8</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('9')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>9</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							style={[styles.button, { backgroundColor: '#fff8da' }]}
						>
							<Text style={styles.buttonText}>$</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row}>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('.')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>.</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleButtonPress('0')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>0</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={handleConfirm}
							style={[styles.button, styles.confirmButton]}
						>
							<Ionicons name='checkmark' size={36} color='white' />
						</TouchableOpacity>
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
	button: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '20%',
		height: '80%',
		borderRadius: 20,
		backgroundColor: '#f5f5f5',
	},
	buttonText: {
		fontSize: 24,
		fontWeight: 'bold',
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
