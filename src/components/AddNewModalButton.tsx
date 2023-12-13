import { FC, memo } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface AddNewModalButtonProps {
	title: string | React.JSX.Element
	handleButtonPress: () => void
	style?: object
}

const AddNewModalButton: FC<AddNewModalButtonProps> = memo(
	({ title, handleButtonPress, style = {} }) => {
		return (
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={handleButtonPress}
				style={[styles.button, style]}
			>
				<Text style={styles.buttonText}>{title}</Text>
			</TouchableOpacity>
		)
	}
)

const styles = StyleSheet.create({
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
})

export default AddNewModalButton
