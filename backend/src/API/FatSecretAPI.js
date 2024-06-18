import axios from "axios";

export const FatSecretApiFood = async (accessToken, foodName) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://platform.fatsecret.com/rest/server.api",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        method: "foods.search",
        search_expression: foodName,
        // search_expression: "toast",
        format: "json",
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (err) {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with an error:", err.response.data);
    } else if (err.request) {
      // The request was made but no response was received
      console.error("No response received:", err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", err.message);
    }
    throw err;
  }
};
