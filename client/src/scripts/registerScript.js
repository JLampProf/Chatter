import axios from "axios";

const backend = import.meta.env.VITE_BACK_URL;

export const registerSubmit = async (userLoginData) => {
  try {
    const registeredUser = await axios.post(`${backend}/register`, {
      userLoginData,
    });

    return registeredUser.data;
  } catch (error) {
    if (error?.response?.status === 409) {
      return 409;
    } else if (error?.response?.status === 400) {
      return 400;
    }
  }
};
