import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./Pages/HomePage.jsx";
import CategoryPage from "./Pages/CategoryPage.jsx";
import NotePage from "./Pages/NotePage.jsx";
import CategoriesContextProvider from "./Components/CategoriesContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CategoriesContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Notes App">
          <Stack.Screen name="Notes App" component={HomePage} />
          <Stack.Screen name="CategoryPage" component={CategoryPage} />
          <Stack.Screen name="NotePage" component={NotePage} />
        </Stack.Navigator>
      </NavigationContainer>
      </CategoriesContextProvider>
  );
}
