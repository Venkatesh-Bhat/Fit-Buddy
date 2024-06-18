// import { FatSecretApiFood } from "../API/FatSecretAPI.js";
// import TokenGen from "../API/TokenGen.js";
// import access from "../models/access.js";

// export const searchFoods = async (req, res) => {
//   try {
//     let access_token, expires_in;

//     try {
//       const result = await access.findOne({});
//       if (!result) {
//         throw new Error("No access token found");
//       }

//       access_token = result.access_token;
//       expires_in = result.expires_in;

//       if (!access_token || !expires_in || new Date().getTime() > expires_in) {
//         console.log(
//           `Token is expired or not found, generating a new access token`
//         );
//         const new_access_token = await TokenGen();
//         access_token = new_access_token;
//       }
//     } catch (err) {
//       console.log(
//         "Error in searching the database for an existing access token:",
//         err
//       );
//       console.log("Generating a new access token");
//       access_token = await TokenGen();
//     }

//     const foodName = req.query.foodName;
//     const data = await FatSecretApiFood(access_token, foodName);
//     // console.log(data);
//     return res.status(200).json(data);
//   } catch (err) {
//     console.log("Error:", err);
//     return res.status(500).json({ Error: err.message });
//   }
// };

// export const searchRecipes = async (req, res) => {
//   try {
//     let access_token, expires_in;

//     try {
//       const result = await access.findOne({});
//       if (!result) {
//         throw new Error("No access token found");
//       }

//       access_token = result.access_token;
//       expires_in = result.expires_in;

//       if (!access_token || !expires_in || new Date().getTime() > expires_in) {
//         console.log(
//           `Token is expired or not found, generating a new access token`
//         );
//         const new_access_token = await TokenGen();
//         access_token = new_access_token;
//       }
//     } catch (err) {
//       console.log(
//         "Error in searching the database for an existing access token:",
//         err
//       );
//       console.log("Generating a new access token");
//       access_token = await TokenGen();
//     }

//     const foodName = req.query.foodName;
//     const data = await FatSecretApiFood(access_token, foodName);
//     // console.log(data);
//     return res.status(200).json(data);
//   } catch (err) {
//     console.log("Error:", err);
//     return res.status(500).json({ Error: err.message });
//   }
// };

// OAuth 1.0
import {
  FSAFoodSearch,
  FSAGetFood,
  FSARecipeSearch,
  FSAGetRecipe,
} from "../API/OAuth1-fatsecret.js";

export const searchFoods = async (req, res) => {
  try {
    const foodName = req.query.foodName;
    const data = await FSAFoodSearch(foodName);
    return res.status(200).json(data);
  } catch (err) {
    console.log({ Error: err });
    return res.status(500).json({ Error: err.message });
  }
};

export const getFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const data = await FSAGetFood(foodId);
    return res.status(200).json(data);
  } catch (err) {
    console.log({ Error: err });
    return res.status(500).json({ Error: err.message });
  }
};

export const searchRecipes = async (req, res) => {
  try {
    const recipeName = req.query.recipeName;
    const data = await FSARecipeSearch(recipeName);
    return res.status(200).json(data);
  } catch (err) {
    console.log({ Error: err });
    return res.status(500).json({ Error: err.message });
  }
};

export const getRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const data = await FSAGetRecipe(recipeId);
    return res.status(200).json(data);
  } catch (err) {
    console.log({ Error: err });
    return res.status(500).json({ Error: err.message });
  }
};
