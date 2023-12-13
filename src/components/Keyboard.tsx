import { Ionicons } from '@expo/vector-icons'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import KeyboardButton from './KeyboardButton'

const buttons: string[][] = [
	['1', '2', '3'],
	['4', '5', '6'],
	['7', '8', '9'],
	['.', '0'],
]

interface KeyboardProps {
	setExpense: React.Dispatch<React.SetStateAction<string>>
	handleConfirm: () => void
}

const Keyboard: FC<KeyboardProps> = ({ setExpense, handleConfirm }) => {
	const handleButtonPress = (value: string) =>
		React.useCallback(() => {
			setExpense(prevValue => {
				if (prevValue === '$0') {
					return `$${value}`
				}

				if (value === '.' && prevValue.indexOf('.') === -1) {
					return prevValue + value
				}
				if (prevValue.lastIndexOf('.') === -1) {
					if (prevValue.length > 6) {
						return prevValue
					}
					return prevValue + value
				} else if (prevValue.length > 10) {
					return prevValue
				}
				return prevValue + value
			})
		}, [])

	const handleRemoveLast = React.useCallback(() => {
		setExpense(prevValue => {
			if (prevValue.length === 1) return '$'
			return prevValue.slice(0, prevValue.length - 1)
		})
	}, [])

	return (
		<View style={styles.grid}>
			<View style={styles.row}>
				{buttons[0].map((item, index) => (
					<KeyboardButton
						key={index}
						title={item}
						handleButtonPress={handleButtonPress(item)}
					/>
				))}
				<KeyboardButton
					title={<Ionicons name='backspace-outline' size={24} color='black' />}
					handleButtonPress={handleRemoveLast}
					style={{ backgroundColor: '#ffe0d7' }}
				/>
			</View>
			<View style={styles.row}>
				{buttons[1].map((item, index) => (
					<KeyboardButton
						key={index}
						title={item}
						handleButtonPress={handleButtonPress(item)}
					/>
				))}
				<KeyboardButton
					title={<Ionicons name='md-calendar-sharp' size={24} color='black' />}
					style={{ backgroundColor: '#e0ebfe' }}
					handleButtonPress={() => {}}
				/>
			</View>
			<View style={styles.row}>
				{buttons[2].map((item, index) => (
					<KeyboardButton
						key={index}
						title={item}
						handleButtonPress={handleButtonPress(item)}
					/>
				))}
				<KeyboardButton
					title={'$'}
					handleButtonPress={() => {}}
					style={{ backgroundColor: '#fff8da' }}
				/>
			</View>
			<View style={styles.row}>
				{buttons[3].map((item, index) => (
					<KeyboardButton
						key={index}
						title={item}
						handleButtonPress={handleButtonPress(item)}
					/>
				))}
				<KeyboardButton
					title={<Ionicons name='checkmark' size={36} color='white' />}
					handleButtonPress={handleConfirm}
					style={styles.confirmButton}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
})

export default Keyboard
