import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function FoodItem({ food }) {
  const navigation = useNavigation();
  const desc = food.food_description.split(" - ");
  const nutrientArray = desc[1].split(" | ");
  const nutrientObj = {};
  nutrientArray.forEach((nutrient) => {
    const [name, value] = nutrient.split(":");
    nutrientObj[name.trim()] = value.trim();
  });

  const handleClick = async (id) => {
    navigation.navigate("Food Details", { id: id, desc: desc });
  };

  return (
    <Card
      mode="elevated"
      style={styles.card}
      onPress={() => {
        handleClick(food.food_id);
      }}
    >
      <Card.Content>
        <Text variant="titleMedium" style={styles.name}>
          {food.food_name}
        </Text>
        {/* <Text variant="titleSmall">{desc[0]}</Text> */}
        {/* <Text variant="bodySmall">{desc[1]}</Text> */}
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
            {nutrientObj.Calories}
          </Text>
          <Text style={styles.nut} variant="bodySmall">
            {nutrientObj.Fat}
          </Text>
          <Text style={styles.nut} variant="bodySmall">
            {nutrientObj.Carbs}
          </Text>
          <Text style={styles.nut} variant="bodySmall">
            {nutrientObj.Protein}
          </Text>
        </View>
        <Text variant="labelLarge" style={styles.type}>
          {food.brand_name}
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
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ed045b",
  },
  type: {
    textAlign: "right",
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
