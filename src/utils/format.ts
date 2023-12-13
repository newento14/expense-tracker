export const convertToCurrency = (price: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price)

export const convertTonNumber = (price: string) => {
	const value = price.replace(/[^0-9.-]+/g, '')
	console.log('🚀 ~ file: format.ts:9 ~ convertTonNumber ~ value:', value)
	return Number(value)
}

export function formatDate(inputDate: string) {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	const [day, month, year] = inputDate.split('/').map(Number)

	const monthName = months[month - 1]
	return `${day} ${monthName} ${year}`
}
