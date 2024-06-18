import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function RecipeItem({ recipe }) {
  const navigation = useNavigation();
  const desc = recipe.recipe_nutrition;

  const handleClick = (id) => {
    navigation.navigate("Recipe Details", { id });
  };

  return (
    <Card
      mode="elevated"
      style={styles.card}
      onPress={() => {
        handleClick(recipe.recipe_id);
      }}
    >
      <Card.Title
        title={recipe.recipe_name}
        titleVariant="titleMedium"
        titleStyle={{ paddingBottom: 6 }}
      />
      {recipe.recipe_image ? (
        <Card.Cover source={{ uri: recipe.recipe_image }} />
      ) : (
        <Card.Cover
          source={require("../../assets/No_Image_Available.jpg")}
          resizeMode="stretch"
        />
      )}
      <Card.Content>
        <View style={[styles.nutrient, { marginTop: 10 }]}>
          <Text style={styles.nut} variant="labelMedium">
            Calories
          </Text>
          <Text style={styles.nut} variant="labelMedium">
            Fat
          </Text>
          <Text style={styles.nut} variant="labelMedium">
            Carbs
          </Text>
          <Text style={styles.nut} variant="labelMedium">
            Protein
          </Text>
        </View>
        <View style={styles.nutrient}>
          <Text style={styles.nut} variant="bodySmall">
            {desc.calories}
          </Text>
          <Text style={styles.nut} variant="bodySmall">
            {desc.fat}
          </Text>
          <Text style={styles.nut} variant="bodySmall">
            {desc.carbohydrate}
          </Text>
          <Text style={styles.nut} variant="bodySmall">
            {desc.protein}
          </Text>
        </View>
        <Text variant="bodyMedium" style={styles.type}>
          {recipe.recipe_description}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    // backgroundColor: "#ed045b",
    elevation: 5,
  },
  name: {
    // marginTop: 6,
    // borderTopWidth: 1,
    // borderTopColor: "#ed045b",
  },
  type: {
    textAlign: "auto",
    marginTop: 16,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#ed045b",
  },
  nutrient: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  nut: {
    textAlign: "center",
  },
});
