import { View, ScrollView, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Category from "../Components/Category";
import AddCategory from "../Components/AddCategory";
import { CategoriesContext } from '../Components/CategoriesContext';


export default function HomePage(props) {
  const [str, setStr] = useState("");
  const {categories} = useContext(CategoriesContext);

  useEffect(() => {
    let cat = categories.map((category) => (
      <Pressable
        onPress={() => props.navigation.navigate("CategoryPage", { category })}
        key={category.Id}
      >
        <Category category={category} key={category.Id} />
      </Pressable>
    ));
    setStr(cat);

    return () => {};
  }, [categories]);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Text style={{ textAlign: "center", fontSize: 50 }}>
        {"\n"}My Categories
      </Text>
      <ScrollView>{str}</ScrollView>
      <View
        style={{
          height: "8%",
          marginLeft: "10%",
          marginRight: "10%",
          marginBottom: "3%",
        }}
      >
        <AddCategory/>
      </View>
    </View>
  );
}
