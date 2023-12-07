import React from 'react';
import {Button, TextInput, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import RNPickerSelect from 'react-native-picker-select';
import AddNewModal from "../components/AddNewModal";


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
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleChangeVisible = () => {
    setModalVisible((prev) => !prev);
  }

  return (
    <View>
      <TextInput placeholder={'Enter your expenses'} value={expenses} onChangeText={(text) => setExpenses(text)}/>
      <Button title={'Set Data'} onPress={() => storeData(expenses)}/>
      <Button title={'Get Data'} onPress={getData}/>
      <Button title={'add'} onPress={handleChangeVisible}/>
      <AddNewModal modalVisible={modalVisible} handleChangeVisible={handleChangeVisible} />
    </View>
  );
};

export default Home;