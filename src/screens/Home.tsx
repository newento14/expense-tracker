import React, {useEffect} from 'react';
import {Button, TextInput, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('expenses', value);
  } catch (e) {
    console.log(e)
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('expenses');
    console.log(value);
  } catch (e) {
    console.log(e);
  }
};

const Home = () => {
  const [expenses, setExpenses] = React.useState('');

  return (
    <View style={{marginTop: 50}}>
      <TextInput placeholder={'Enter your expenses'} value={expenses} onChangeText={(text) => setExpenses(text)} />
      <Button title={'Set Data'} onPress={() => storeData(expenses)}/>
      <Button title={'Get Data'} onPress={getData}/>
    </View>
  );
};

export default Home;