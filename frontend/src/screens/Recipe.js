import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
} from "react-native";
import axios from "axios";
import RecipeList from "./Recipe/RecipeList";
import { Searchbar, Text } from "react-native-paper";
import { server } from "../API/Server";

export default function Recipe() {
  const [recipe, setRecipe] = useState([]);
  const [value, setValue] = useState("");
  const [refreshing, setRefreshing] = useState(recipe.length === 0);

  const handleSubmit = async (value) => {
    if (value === "" || !value) {
      setRecipe([]);
      return;
    }
    setRefreshing(true);
    try {
      const res = await axios.get(
        `${server}/fatsecret/recipes/search?recipeName=${value}`
      );
      //   console.log(res.data);
      // console.log(`RES: ${res.data}`);
      if (!res.data.recipes.recipe) {
        setRecipe([]);
      } else {
        setRecipe(res.data.recipes.recipe);
      }
    } catch (err) {
      setRecipe([]);
      console.log(`Fetch error:${value} :${err}`);
    }
    setRefreshing(false);
  };

  //Modal for side pannel

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Searchbar
          style={styles.input}
          placeholder="Search recipes..."
          onChangeText={setValue}
          value={value}
          onSubmitEditing={() => handleSubmit(value)}
          mode="bar"
          iconColor="white"
          color="white"
          loading={refreshing}
        />
        {/* <TextInput
          style={styles.input}
          onChangeText={setValue}
          value={value}
          placeholder="Search recipes..."
          onSubmitEditing={() => handleSubmit(value)}
        /> */}
        {/* <StatusBar backgroundColor="crimson" barStyle="light-content" /> */}
        {refreshing ? (
          <View style={styles.splash}>
            <ActivityIndicator size="large" color="tomato" />
            <Text>Waiting for recipe!</Text>
          </View>
        ) : (
          <RecipeList
            recipes={recipe}
            // refresh={refreshing}
            // handleRefresh={handleItemRefresh}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // input: {
  //   height: 40,
  //   margin: 12,
  //   width: "95%",
  //   borderWidth: 1,
  //   padding: 10,
  //   alignSelf: "center",
  // },
  input: {
    margin: 12,
    backgroundColor: "rgba(255,4,75,0.7)",
    // width: "95%",
    // padding: 1,
    alignSelf: "center",
  },
  splash: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
