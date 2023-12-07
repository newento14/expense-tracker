export interface IExpense {
  date: string;
  expense: number;
  category: Categories;
  comment: string;
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

/*  {label: '🍗 Food', value: 'food'},
            {label: '🏠 Housing', value: 'housing'},
            {label: '🚕 Transport', value: 'transport'},
            {label: '👕 Clothing', value: 'clothing'},
            {label: '💊 Healthcare', value: 'healthcare'},
            {label: '📚 Education', value: 'education'},
            {label: '🎉 Entertainment', value: 'entertainment'}, */