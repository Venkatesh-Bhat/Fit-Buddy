import express from "express";
import {
  searchFoods,
  getFood,
  searchRecipes,
  getRecipe,
} from "../controllers/fatsecret-controller.js";

const fatSecretRoute = express.Router();

//  Search food by name in Fat Secret database
fatSecretRoute.get("/foods/search", searchFoods);

//Get a particular food by it's id
fatSecretRoute.get("/foods/:id", getFood);

// Search recipe by a name in Fat Secret database
fatSecretRoute.get("/recipes/search", searchRecipes);

//Get a particular recipe by it's id
fatSecretRoute.get("/recipes/:id", getRecipe);

export default fatSecretRoute;
