import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL;

const getJobs = async () => {
  const response = await axios.get(`${baseUrl}/jobs`);
  return response.data;
};

export default getJobs;
