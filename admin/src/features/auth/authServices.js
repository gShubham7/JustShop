import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  const response = await axios.post(`${base_url}/auth/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(`${base_url}/order/get-all-orders`, config);

  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}/order/get-orders/${id}`,
    config
  );
  return response.data;
};

const authService = {
  login,
  getAllOrders,
  getOrder,
};

export default authService;
