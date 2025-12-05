import axios from "axios";

const backend = import.meta.env.VITE_BACK_URL;

export const registerSubmit = async (userLoginData) => {
  try {
    const registeredUser = await axios.post(`${backend}/api/register`, {
      userLoginData,
    }, {
      withCredentials: true,
    });

    return registeredUser.data;
  } catch (error) {
    if (error?.response?.status === 409) {
      return { error: true, status: 409 };
    } else if (error?.response?.status === 400) {
      return { error: true, status: 400 };
    }

    throw new Error("Server Error");
  }
};
