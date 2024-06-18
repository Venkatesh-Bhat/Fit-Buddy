import axios from "axios";
import crypto from "crypto";

const consumerKey = "f6b106f39c9241f7b0a89cc39827e07e";
const consumerSecret = "097bec2b9ef547c795524d2ebe75d35d";

const generateNonce = () => {
  return Math.random().toString(36).substring(2);
};

const generateTimestamp = () => {
  return Math.floor(Date.now() / 1000).toString();
};

const params = {
  max_results: 50,
  format: "json",
  oauth_consumer_key: consumerKey,
  oauth_signature_method: "HMAC-SHA1",
  oauth_timestamp: generateTimestamp(),
  oauth_nonce: generateNonce(),
  oauth_version: "1.0",
};

const generateSignature = (method, url, params) => {
  const parameterString = Object.keys(params)
    .sort()
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  const signatureBase = `${method.toUpperCase()}&${encodeURIComponent(
    url
  )}&${encodeURIComponent(parameterString)}`;

  const hmac = crypto.createHmac("sha1", consumerSecret + "&");
  hmac.update(signatureBase);
  return hmac.digest("base64");
};

//Search Foods
export const FSAFoodSearch = async (foodName) => {
  const url = "https://platform.fatsecret.com/rest/server.api";
  const method = "GET";

  try {
    const newParams = { ...params };
    newParams.method = "foods.search";
    newParams.search_expression = foodName;
    newParams.oauth_timestamp = generateTimestamp();

    const signature = generateSignature(method, url, newParams);

    const response = await axios.get(url, {
      params: { ...newParams, oauth_signature: signature },
    });

    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

//Get one food by id
export const FSAGetFood = async (foodId) => {
  const url = "https://platform.fatsecret.com/rest/server.api";
  const method = "GET";

  try {
    const newParams = { ...params };
    newParams.method = "food.get.v4";
    newParams.food_id = foodId;
    newParams.oauth_timestamp = generateTimestamp();

    // delete newParams.search_expression;

    const signature = generateSignature(method, url, newParams);

    const response = await axios.get(url, {
      params: { ...newParams, oauth_signature: signature },
    });

    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

//Search recipes
export const FSARecipeSearch = async (recipeName) => {
  const url = "https://platform.fatsecret.com/rest/server.api";
  const method = "GET";

  try {
    const newParams = { ...params };
    newParams.method = "recipes.search.v3";
    newParams.search_expression = recipeName;
    newParams.oauth_timestamp = generateTimestamp();

    const signature = generateSignature(method, url, newParams);

    const response = await axios.get(url, {
      params: { ...newParams, oauth_signature: signature },
    });

    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

//Get one recipe by it's id
export const FSAGetRecipe = async (recipeId) => {
  const url = "https://platform.fatsecret.com/rest/server.api";
  const method = "GET";

  try {
    const newParams = { ...params };
    newParams.method = "recipe.get.v2";
    newParams.recipe_id = recipeId;
    newParams.oauth_timestamp = generateTimestamp();

    // delete newParams.search_expression;

    const signature = generateSignature(method, url, newParams);

    const response = await axios.get(url, {
      params: { ...newParams, oauth_signature: signature },
    });

    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};
