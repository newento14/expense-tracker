import React from "react";
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {Categories} from "../types/expenses";
import {View, StyleSheet} from "react-native";

const CategoryToColor = {
  [Categories.Food]: '#ffe0d7',
  [Categories.Transport]: '#ffe1a7',
  [Categories.Entertainment]: '#e9dffe',
  [Categories.Housing]: '#fff2ba',
  [Categories.Healthcare]: '#b2fff2',
  [Categories.Clothing]: '#dfffe1',
  [Categories.Education]: '#ffaafa',
  [Categories.Other]: '#b2cbf8',
}

const CategoryIcon = (category: Categories): React.JSX.Element => {
  switch (category) {
    case Categories.Food:
      return <Ionicons name="md-fast-food-outline" size={24} color="black" />;
    case Categories.Transport:
      return <FontAwesome name="taxi" size={24} color="black" />;
    case Categories.Entertainment:
      return <Ionicons name="game-controller-outline" size={24} color="black" />;
    case Categories.Housing:
      return <FontAwesome name="home" size={24} color="black" />;
    case Categories.Healthcare:
      return <Ionicons name="medkit-outline" size={24} color="black" />;
    case Categories.Clothing:
      return <Ionicons name="shirt" size={24} color="black" />;
    case Categories.Education:
      return <Ionicons name="school-outline" size={24} color="black" />;
    case Categories.Other:
      return <Ionicons name="ellipsis-horizontal-outline" size={24} color="black"/>;
  }
}

export const CategoryToIcon = ({category}: { category: Categories }) => {
  return (
    <View style={[styles.icon, {backgroundColor: CategoryToColor[category]}]}>
      {CategoryIcon(category)}
    </View>
  )
};


const styles = StyleSheet.create({
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 60,
    height: 60,
  }
})