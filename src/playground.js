const axios = require("axios");

const url = "http://localhost:3000/jobs";

const fetchJobsv1 = () => {
  axios.get(url).then((res) => {
    console.log(res.data);
  });
};

const fetchJobsv2 = async () => {
  const res = await axios.get(url);
  console.log(res.data);
};
