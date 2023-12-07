import { IExpense } from "../types/expenses";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addExpense(expense: IExpense) {
  try {
    let expenses = await AsyncStorage.getItem('expenses');

    let expensesArray: IExpense[] = expenses ? JSON.parse(expenses) : [];

    expensesArray.unshift(expense);

    await AsyncStorage.setItem('expenses', JSON.stringify(expensesArray));
  } catch (error) {
    console.error("Error adding expense: ", error);
  }
}
