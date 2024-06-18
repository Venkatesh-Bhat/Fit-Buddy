import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Linking,
  ActivityIndicator,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Text, List, RadioButton, Button } from "react-native-paper";
import axios from "axios";
import NutritionList from "../NutritionList";
import { server } from "../../API/Server";

export default function FoodDetails({ route }) {
  const id = route.params.id;
  const desc = route.params.desc;
  const [foodData, setFoodData] = useState([]);
  const [value, setValue] = useState("");
  const [nutrientView, setNutrientView] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await axios.get(`${server}/fatsecret/foods/${id}`);
        setFoodData(data.data.food);
      } catch (err) {
        console.log(err);
        setFoodData([]);
      }
    }
    fetchDetails();
  }, []);

  const handleSize = (id) => {
    setValue(id);
    const nutrients = foodData.servings.serving.filter(
      (item) => item.serving_id === id
    );
    const newNutrientView = nutrients.map((item) => {
      return (
        <Fragment key={item.serving_id}>
          <NutritionList item={item} />
        </Fragment>
      );
    });
    setNutrientView(newNutrientView);
  };

  return (
    <SafeAreaView style={styles.container}>
      {foodData.length === 0 ? (
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
              {foodData.food_name}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: "#ed045b", textAlign: "auto" }}
            >
              {desc[0]} - {desc[1]}
            </Text>
          </View>
          <View style={styles.header}>
            <Text
              variant="headlineSmall"
              style={[styles.text, { color: "#ed045b" }]}
            >
              Nutrition Details
            </Text>
            <List.AccordionGroup>
              <List.Accordion title="Serving Size" id="1" style={styles.choose}>
                <RadioButton.Group
                  onValueChange={(value) => handleSize(value)}
                  value={value}
                >
                  <View style={styles.chooseSize}>
                    {foodData.servings.serving.map((data) => (
                      <RadioButton.Item
                        label={data.serving_description}
                        value={data.serving_id}
                        key={data.serving_id}
                        mode="ios"
                        labelVariant="bodySmall"
                        position="leading"
                        color="#ed045b"
                      />
                    ))}
                  </View>
                </RadioButton.Group>
              </List.Accordion>
            </List.AccordionGroup>
          </View>
          <View style={styles.nutrient}>{nutrientView && nutrientView}</View>
          <Button
            mode="contained"
            style={{ backgroundColor: "rgba(255,4,75,0.5)" }}
            onPress={() => Linking.openURL(foodData.food_url)}
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
  },
  text: {
    marginBottom: 8,
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
  nutText: {
    marginTop: 3,
    marginStart: 7,
  },
  splash: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
