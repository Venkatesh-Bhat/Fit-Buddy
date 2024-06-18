import axios from "axios";
import base64 from "base-64";
import access from "../models/access.js";

const clientID = "f6b106f39c9241f7b0a89cc39827e07e";
const clientSecret = "e11e9f2d78ee416398afe3546c6da237";

const TokenGen = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("scope", "basic");

  const basicAuth = "Basic " + base64.encode(`${clientID}:${clientSecret}`);

  try {
    const response = await axios({
      method: "post",
      url: "https://oauth.fatsecret.com/connect/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: basicAuth,
      },
      data: params,
    });
    // console.log(response.data);
    const { access_token, expires_in } = response.data;
    try {
      await access.deleteMany({});
      console.log("Previous token deleted");
    } catch (err) {
      console.log("Unable to delete previous token");
    }
    const Access = new access({
      access_token: access_token,
      expires_in: new Date().getTime() + expires_in * 1000,
    });
    await Access.save();
    return access_token;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default TokenGen;
