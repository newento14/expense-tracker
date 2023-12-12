import React, { FC } from 'react'
import RNPickerSelect from 'react-native-picker-select'

interface CategorySelectProps {
	handleCategoryChange: (value: string) => void
}

const categories = [
	{ label: '🍗 Food', value: 'Food' },
	{ label: '🏠 Housing', value: 'Housing' },
	{ label: '🚕 Transport', value: 'Transport' },
	{ label: '👕 Clothing', value: 'Clothing' },
	{ label: '💊 Healthcare', value: 'Healthcare' },
	{ label: '📚 Education', value: 'Education' },
	{ label: '🎉 Entertainment', value: 'Entertainment' },
]

const CategorySelect: FC<CategorySelectProps> = ({ handleCategoryChange }) => {
	return (
		<RNPickerSelect
			placeholder={{ label: 'Other', value: 'other' }}
			onValueChange={handleCategoryChange}
			items={categories}
		/>
	)
}

export default CategorySelect
