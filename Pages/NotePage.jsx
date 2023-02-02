import { View, Text, TextInput, Button,ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { CategoriesContext } from '../Components/CategoriesContext';


const tempNote = {Id:0, Name:"New Note", Content: "Enter here your content", Date:new Date().toLocaleDateString()};

export default function NotePage(props) {
  const [note, setNote] = useState(tempNote);
  const [category, setCategory] = useState();
  const {noteCounter, setNoteCounter, categories, setCategories} = useContext(CategoriesContext);

  useEffect(() => {
    setNote(
      props.route.params.note != undefined ? props.route.params.note : tempNote
    );
    setCategory(
      props.route.params.category != undefined ? props.route.params.category : undefined
    );
  }, []);

  useEffect(() => {
    props.navigation.setOptions({ headerTitle: note.Name });
  }, [note]);

  const saveBtn = () => { 
    let newListNotes;
    if (note.Id > 0){
      newListNotes = category.Notes.filter((n) => n.Id != note.Id);
      newListNotes = [...newListNotes, note];
    }
    else{
      let newNote = {Id:noteCounter, Name:note.Name, Content:note.Content, Date:new Date().toLocaleDateString()};
      setNote(newNote);
      setNoteCounter(prev => prev +1);
      newListNotes = [newNote];
      if (category.Notes.length > 0)
        newListNotes = [...category.Notes, newNote];
    }
    
    setCategory(prev => ({Id: prev.Id, Name:prev.Name, Color:prev.Color, Notes: newListNotes}));
    let newListCategories = categories.filter((c) => c.Id != category.Id);
    newListCategories = [...newListCategories , {Id: category.Id, Name:category.Name, Color:category.Color, Notes: newListNotes}];
    setCategories(newListCategories);

    props.navigation.goBack();
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between", width:"80%", marginLeft:"10%"}}>
      <ScrollView>
          <Text style={{textAlign:"center", fontSize: 15, color: "gray" }}>{"\n"}Last Updated : {note.Date}</Text>
          <TextInput
            editable
            multiline
            onChangeText={text => setNote(prev => ({Id: prev.Id, Name:text, Content:prev.Content , Date: new Date().toLocaleDateString()}))}
            value={note.Name}
            style={{textAlign:"center", fontSize: 22,fontWeight: "bold"}}
          />
          <TextInput
            editable
            multiline
            onChangeText={text => setNote(prev => ({Id: prev.Id, Name:prev.Name, Content:text , Date: new Date().toLocaleDateString()}))}
            value={note.Content}
            style={{fontSize: 18}}
          />
      </ScrollView>
      <View style={{height: "7%",marginLeft:"10%", marginRight:"10%", display: "flex", alignItems:"center",justifyContent:"space-between",flexDirection: 'row' }}>
        <Button onPress={saveBtn} title="Save"/>
        <Button onPress={() => props.navigation.goBack()} title="Cancel"/>
        </View>
    </View>


  )
}