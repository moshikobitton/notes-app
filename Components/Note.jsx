import { View, Text } from "react-native";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { CategoriesContext } from './CategoriesContext';
import { useContext } from "react";



export default function Note(props) {
  const {categories, setCategories} = useContext(CategoriesContext);

  const deleteNote = () => {

    let category = categories.find((category) => category.Id == props.category.Id);
    let notesList = category.Notes.filter(note => note.Id != props.note.Id);
    category.Notes = notesList;
    let categoryList = categories.filter((category) => category.Id != props.category.Id);

    setCategories([...categoryList, category]);
  };

  return (
    <View
      style={{
        padding:10,
        height:100,
        width: "80%",
        borderRadius: 10,
        backgroundColor: "white",
        display: "flex",
        marginTop: "2%",
        marginLeft: "10%",
        shadowColor: "#000",
        alignItems:"stretch",
        justifyContent:"center",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      }}
    >
      <View><Text style={{ textAlign:"center", fontSize: 20, fontWeight: "bold" }}>
        {props.note.Name.length < 20
            ? props.note.Name+"  "
            : props.note.Name.slice(0, 17) + "..."}
        <Text style={{ fontSize: 10, color: "gray", fontWeight: "normal" }}>
          {props.note.Date}
        </Text>
        
      </Text>
      <Text>{props.note.Content.length < 72
            ? props.note.Content+"  "
            : props.note.Content.slice(0, 72) + "..."}
      </Text></View>
      <View style={{alignItems:"center"}}>
        <Button onPress={deleteNote} variant="" style={{width:50}} leading={() => <Icon name="delete" style={{color:props.category.Color, fontSize:20}} />}/>
        </View>
    </View>
  );
}
