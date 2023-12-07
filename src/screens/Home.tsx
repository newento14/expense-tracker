import React, {useEffect} from 'react';
import {Button, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddNewModal from "../components/AddNewModal";
import {IExpense} from "../types/expenses";
import {calculateExpenses, formatArray} from "../utils/calculate";
import {CategoryToIcon} from "../utils/CategoryToIcon";

type UnspecifiedObject = Record<string, IExpense[]>;

const Home = () => {
  const [expenses, setExpenses] = React.useState<UnspecifiedObject>({});
  const [modalVisible, setModalVisible] = React.useState(false);

  const getData = async (): Promise<void> => {
    try {
      const value = await AsyncStorage.getItem('expenses');
      const data = await JSON.parse(value || '[]') as IExpense[]
      console.log(calculateExpenses(data));
      setExpenses(formatArray(data));
    } catch (e) {
      console.error(e);
      setExpenses({});
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangeVisible = () => {
    setModalVisible((prev) => !prev);
  }

  const handleAddExpense = (expense: IExpense) => {
    setExpenses({...expenses, Today: [expense, ...expenses.Today]});
  }

  return (
    <>
      <Button title={'add'} onPress={handleChangeVisible}/>
      <AddNewModal modalVisible={modalVisible} handleChangeVisible={handleChangeVisible}
                   pushNewExpense={handleAddExpense}/>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={Object.keys(expenses).map((title) => ({title: title, data: expenses[title]}))}
          keyExtractor={(item, index) => item.date + index}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.item}>
              <CategoryToIcon category={item.category}/>
              <View
                style={{justifyContent: "space-between", display: "flex", flexDirection: 'row', width: "80%", height: 30, alignItems: 'center'}}>
                <Text style={[styles.title, {fontWeight: '500', fontSize: 18}]}>{item.category}</Text>
                <View style={{display: "flex", flexDirection: "row", alignItems: "flex-end"}}>
                  <Text style={{fontSize: 14}}>$</Text>
                  <Text style={{fontWeight: "bold", fontSize: 26}}>{item.expense}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  title: {
    marginLeft: 12,
    fontSize: 24,
  },
});

export default Home;