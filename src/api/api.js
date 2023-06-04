import axios from "axios";

axios.defaults.baseURL = "https://647242406a9370d5a41b3464.mockapi.io";

export const fetchUsers = async () => {
  try {
    const response =  await axios.get(`/users`);
    return response;
  } catch (e) {
    console.log(e);
  };
};