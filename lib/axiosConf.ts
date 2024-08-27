import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://expensemate.devsuvam.xyz",
});

export default axiosClient;
