import axios from "axios";

const SERVER = axios.create({
  baseURL: "https://fuel.gov.lk/api/v1",
});

export default SERVER;
