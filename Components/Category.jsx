import { View, Text } from "react-native";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { CategoriesContext } from "./CategoriesContext";
import { useContext } from "react";

export default function Category(props) {
  const { categories, setCategories } = useContext(CategoriesContext);

  const deleteCategory = () => {
    let categoryList = categories.filter(
      (category) => category.Id != props.category.Id
    );
    setCategories([...categoryList]);
  };

  return (
    <View
      style={{
        width: "80%",
        display: "flex",
        marginLeft: "10%",
        backgroundColor: props.category.Color,
        borderRadius: 20,
        margin: 3,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 25 }}>
          {"\n"}
          {"   "}
          {props.category.Name.length < 20
            ? props.category.Name
            : props.category.Name.slice(0, 17) + "..."}
        </Text>

        <Text style={{ fontSize: 25 }}>
          {"\n"}
          {"" + props.category.Notes.length > 0
            ? props.category.Notes.length
            : 0}
          {"  "}
        </Text>
      </View>
      
      <View style={{ width: 50, alignSelf: "center" }}>
        <Button
          onPress={deleteCategory}
          variant=""
          leading={(props) => <Icon name="delete" style={{ fontSize:20}}/>}
        />
      </View>
    </View>
  );
}
