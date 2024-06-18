import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { Text, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/AntDesign";
import NutritionList from "../NutritionList";
import { server } from "../../API/Server";

export default function RecipeDetail({ route }) {
  const { id } = route.params;
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${server}/fatsecret/recipes/${id}`);
        setRecipe(res.data.recipe);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {recipe.length === 0 ? (
        <View style={styles.splash}>
          <ActivityIndicator size="large" color="tomato" />
          <Text>Loading details!</Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
          <View style={styles.header}>
            <Text
              variant="headlineSmall"
              style={[styles.text, { color: "#ed045b" }]}
            >
              {recipe.recipe_name}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: "#ed045b", textAlign: "auto" }}
            >
              {recipe.recipe_description}
            </Text>
          </View>
          <View style={styles.header}>
            <Text
              variant="headlineSmall"
              style={[styles.text, { color: "#ed045b" }]}
            >
              Recipe Details
            </Text>
            {recipe.cooking_time_min && (
              <Text variant="bodyLarge">
                Cooking Time: {recipe.cooking_time_min}mins
              </Text>
            )}
            <Text variant="bodyLarge">
              Meal Type: {recipe.recipe_types.recipe_type}
            </Text>
            <Text variant="bodyLarge">
              Serving Size: {recipe.number_of_servings}
            </Text>
            <Text variant="bodyLarge">
              Ratings:{" "}
              {[...Array(5)].map((_, i) =>
                i < recipe.rating ? (
                  <Icon key={i} name="star" color="#ed045b" size={20} />
                ) : (
                  <Icon key={i} name="staro" color="#ccc" size={20} />
                )
              )}
            </Text>
          </View>
          <View style={styles.header}>
            <Text
              variant="headlineSmall"
              style={[styles.text, { color: "#ed045b" }]}
            >
              Ingredients
            </Text>
            <FlatList
              data={recipe.ingredients.ingredient}
              renderItem={({ item }) => (
                <Text variant="bodyMedium">{item.ingredient_description}</Text>
              )}
              scrollEnabled={false}
            />
          </View>
          <View style={styles.header}>
            <Text
              variant="headlineSmall"
              style={[styles.text, { color: "#ed045b" }]}
            >
              Cooking Instructions
            </Text>
            <FlatList
              data={recipe.directions.direction}
              renderItem={({ item }) => (
                <Text
                  variant="bodyMedium"
                  style={{ textAlign: "left", marginRight: 10 }}
                >
                  {item.direction_number + ". " + item.direction_description}
                </Text>
              )}
              scrollEnabled={false}
            />
          </View>
          <View style={[styles.header, { gap: 0, marginBottom: 20 }]}>
            <Text
              variant="headlineSmall"
              style={[styles.text, { color: "#ed045b" }]}
            >
              Nutrition Details
            </Text>
            <Text variant="bodyLarge">
              Serving Size: {recipe.serving_sizes.serving.serving_size}
            </Text>
            <NutritionList item={recipe.serving_sizes.serving} />
          </View>
          <Button
            mode="contained"
            style={{ backgroundColor: "rgba(255,4,75,0.5)" }}
            onPress={() => Linking.openURL(recipe.recipe_url)}
          >
            More Details
          </Button>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    gap: 8,
  },
  text: {
    // marginBottom: 8,
    borderBottomColor: "#ed045b",
    borderBottomWidth: 1.5,
  },
  choose: {
    backgroundColor: "#eee",
    borderRadius: 10,
    borderColor: "#ed045b",
    borderWidth: 1,
  },
  chooseSize: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  nutrient: {
    flex: 1,
    paddingVertical: 6,
    marginBottom: 3,
  },

  splash: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
