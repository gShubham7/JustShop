import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  console.log(data);
  const response = await axios.post(`${base_url}product/upload`, data);
  return response.data;
};
const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,

    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
