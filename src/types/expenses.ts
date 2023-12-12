export interface IExpense {
	date: string
	expense: number
	category: Categories
	comment: string
}

export enum Categories {
	Food = 'Food',
	Housing = 'Housing',
	Clothing = 'Clothing',
	Healthcare = 'Healthcare',
	Education = 'Education',
	Entertainment = 'Entertainment',
	Transport = 'Transport',
	Other = 'Other',
}
