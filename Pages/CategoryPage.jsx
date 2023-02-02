import { View, ScrollView, Button, Pressable, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Note from "../Components/Note";
import { CategoriesContext } from '../Components/CategoriesContext';


const tempCategory = {Id:0, Name:"",Color:"", Count: 0}; 

export default function CategoryPage(props) {
  const [str, setStr] = useState("");
  const [category, setCategory] = useState(tempCategory);
  const {categories, setCategories} = useContext(CategoriesContext);


  useEffect(() => {

    let category = props.route.params != undefined ? props.route.params.category : tempCategory;
    
    if (category.Id > 0){
      let c = categories.filter(cate => cate.Id == category.Id);
      category = c[0];
    }

    setCategory(category);

    
    if(category.Notes.length > 0){
      let noteStr = category.Notes.map((note) => (
        <Pressable onPress={() => props.navigation.navigate("NotePage", { category, note })} key={note.Id}>
          <Note note={note} category={category} />
        </Pressable>
      ));
      setStr(noteStr);
    }
    else
      setStr(<Text style={{textAlign:"center", marginTop:"10%",fontSize:20}}>There are no notes yet ...</Text>);
  }, [categories]);

  useEffect(() => {
    props.navigation.setOptions({ headerTitle: category.Name });
  }, [category]);

  return (
    <View style={{ flex: 1, justifyContent: "space-between"}}>
      <ScrollView>{str}</ScrollView>
      <View style={{height: "7%",marginLeft:"10%", marginRight:"10%", display: "flex", alignItems:"center",justifyContent:"center" }}>
        <Button onPress={() => props.navigation.navigate("NotePage",{category})} title="Add new note"/>
      </View>
    </View>
  );
}
