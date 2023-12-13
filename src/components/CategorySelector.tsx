import { AntDesign } from '@expo/vector-icons'
import React, { FC, memo } from 'react'
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import Modal from 'react-native-modal'
import { IExpense } from '../types/expenses'
import { CategoryToColor } from '../utils/CategoryToIcon'

const categories = [
	{ label: '🍗 Food', value: 'Food' },
	{ label: '🏠 Housing', value: 'Housing' },
	{ label: '🚕 Transport', value: 'Transport' },
	{ label: '👕 Clothing', value: 'Clothing' },
	{ label: '💊 Healthcare', value: 'Healthcare' },
	{ label: '📚 Education', value: 'Education' },
	{ label: '🎉 Entertainment', value: 'Entertainment' },
	{ label: '🔮 Other', value: 'Other' },
]

interface CategorySelectorProps {
	item: IExpense
	changeCategory: (newCategory: string) => void
	style?: object
}

const CategorySelector: FC<CategorySelectorProps> = memo(
	({ item, changeCategory, style = {} }) => {
		const [visible, setVisible] = React.useState(false)
		const bg = CategoryToColor[item.category]

		const changeVisible = () => {
			setVisible(prev => !prev)
		}

		const handleClose = () => {
			changeVisible()
		}

		return (
			<>
				<View style={{ width: '100%', ...style, marginBottom: 12 }}>
					<View style={styles.line} />
					<TouchableOpacity
						style={[styles.category, { backgroundColor: bg }]}
						activeOpacity={0.6}
						onPress={changeVisible}
					>
						<Text style={{ fontSize: 15, fontWeight: '500' }}>
							{item.category}
						</Text>
						<AntDesign name='edit' size={16} color='black' />
					</TouchableOpacity>
				</View>
				<Modal
					style={styles.modal}
					isVisible={visible}
					onBackdropPress={handleClose}
				>
					<View style={styles.content}>
						<FlatList
							data={categories}
							ItemSeparatorComponent={() => <View style={styles.separator} />}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={styles.item}
									onPress={() => {
										changeCategory(item.value)
										changeVisible()
									}}
								>
									<Text style={styles.text}>{item.label}</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</Modal>
			</>
		)
	}
)

const styles = StyleSheet.create({
	modal: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 0,
	},
	content: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#fff',
		maxHeight: '60%',
		width: '80%',
		borderRadius: 20,
		padding: 5,
	},
	item: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		height: 50,
	},
	text: {
		fontSize: 20,
		fontWeight: '500',
		marginLeft: 20,
		marginTop: 10,
	},
	line: {
		width: '100%',
		height: 1,
		backgroundColor: 'gray',
		marginTop: 15,
	},
	category: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		position: 'absolute',
		alignSelf: 'center',
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 3,
		gap: 5,
	},
	separator: {
		marginVertical: 2,
		height: 1,
		width: '100%',
		backgroundColor: '#ccc',
	},
})

export default CategorySelector
