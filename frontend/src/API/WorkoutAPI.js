import axios from "axios";

const WorkoutAPI = async (params) => {
  const options = {
    method: "GET",
    url: "https://work-out-api1.p.rapidapi.com/search",
    params: params,
    headers: {
      "X-RapidAPI-Key": "926569f9e5msha6def2f55f08503p1d6317jsnbe125f718e71",
      "X-RapidAPI-Host": "work-out-api1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default WorkoutAPI;
