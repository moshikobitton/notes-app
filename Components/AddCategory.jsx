import React, { useState, useContext, useRef } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CategoriesContext } from "../Components/CategoriesContext";

const tempCategory = { Id: 0, Name: "",Color:"none", Notes: {} };

export default function AddCategory() {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState(tempCategory);
  const { categories, setCategories } = useContext(CategoriesContext);
  const { counter, setCounter } = useContext(CategoriesContext);
  const [selectedColor, setSelectedColor] = useState("none");

  const addNewCategory = () => {
    if (category.Name != "") {
      let newCategory = { Id: counter, Name: category.Name, Color: selectedColor, Notes: {} };
      let newList = [...categories, newCategory];
      setCategories(newList);
      setCounter((prev) => prev + 1);
    }
    setModalVisible(!modalVisible);
    setCategory(tempCategory);
  };

  return (
    <View style={styles.centeredView}>
      <Button title="Add new category" onPress={() => setModalVisible(true)} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Category Name</Text>
            <TextInput
              onChangeText={(text) =>
                setCategory((prev) => ({
                  Id: prev.Id,
                  Name: text,
                  Count: prev.Count,
                }))
              }
              value={category}
              placeholder="Enter your name"
            />

            <View>
              <Picker
                selectedValue={selectedColor}
                style={{ height: 200, width: 200 }}
                onValueChange={(itemValue) => setSelectedColor(itemValue)}
              >
                <Picker.Item label="Choose a color" value="none" />
                <Picker.Item label="Red" value="red" />
                <Picker.Item label="Blue" value="blue" />
                <Picker.Item label="Green" value="green" />
                <Picker.Item label="Yellow" value="yellow" />
                <Picker.Item label="Orange" value="orange" />
                <Picker.Item label="Pink" value="pink" />
              </Picker>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Button onPress={addNewCategory} title="Add" />
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                title="Cancel"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:23
  },
});
