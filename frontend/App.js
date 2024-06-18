import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import Dashboard from "./src/screens/Dashboard";
import Food from "./src/screens/Food";
import Recipe from "./src/screens/Recipe";
import Workout from "./src/screens/Workout";
import WorkoutDetail from "./src/screens/Workouts/WorkoutDetail";
import FoodDetails from "./src/screens/Foods/FoodDetails";
import RecipeDetail from "./src/screens/Recipe/RecipeDetail";
import Auth from "./src/screens/Auth";
import { Button, MD3Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import DietPlan from "./src/screens/DietPlan";
import Reminder from "./src/screens/Reminder";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{
            headerTitleStyle: {
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
            },
            headerStyle: {
              backgroundColor: "#ed045b",
            },
            statusBarColor: "crimson",
            statusBarStyle: "light",
          }}
        >
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{
              title: "Diet App",
            }}
          />
          <Stack.Screen
            name="Home"
            component={Dashboard}
            options={({ navigation }) => ({
              title: "Dashboard",
              headerRight: () => (
                <Button
                  mode="contained"
                  style={{ backgroundColor: "rgba(255,4,75,0.5)" }}
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Auth" }],
                    })
                  }
                >
                  <Icon
                    name="logout"
                    color={MD3Colors.neutralVariant95}
                    size={20}
                  />
                </Button>
              ),
            })}
          />
          <Stack.Screen
            name="Food"
            component={Food}
            options={{
              title: "Food",
            }}
          />
          <Stack.Screen
            name="Food Details"
            component={FoodDetails}
            options={{
              title: "Food Details",
            }}
          />
          <Stack.Screen
            name="Recipe"
            component={Recipe}
            options={{
              title: "Recipe",
            }}
          />
          <Stack.Screen
            name="Recipe Details"
            component={RecipeDetail}
            options={{
              title: "Recipe Details",
            }}
          />
          <Stack.Screen
            name="Workout"
            component={Workout}
            options={{
              title: "Workout",
            }}
          />
          <Stack.Screen
            name="Workout Detail"
            component={WorkoutDetail}
            options={({ route }) => ({
              title: route.params.title,
            })}
          />
          <Stack.Screen
            name="Diet Plan"
            component={DietPlan}
            options={{
              title: "Diet Plan",
            }}
          />
          <Stack.Screen
            name="Reminder"
            component={Reminder}
            options={{
              title: "Diet",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
