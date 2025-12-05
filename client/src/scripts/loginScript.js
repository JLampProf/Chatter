/**
 * loginScript.js
 *
 * - Takes the data from the component and sends it to the /login endpoint
 * - If successful, it returns the data to the component.
 */

import axios from "axios";
const { VITE_BACK_URL } = import.meta.env;

/**
 * handleLogin(userLoginData)
 *
 * Steps:
 *  - Contacts the /login endpoint on the server, with the data from the component
 *  - Returns the data tot he component
 *
 *  - Checks to see if a 401 comes from the backend
 *  - Throws an error if unsuccessful
 */

export const handleLogin = async (userLoginData) => {
  try {
    const userDBData = await axios.post(`${VITE_BACK_URL}/api/login`, {
      userLoginData,
    }, {
      withCredentials: true,
    });

    return userDBData.data;
  } catch (error) {
    if (error?.response?.status === 400) {
      return { error: true, status: 400 };
    } else if (error?.response?.status === 401) {
      return { error: true, status: 401 };
    } else if (error?.response?.status === 500) {
      return { error: true, status: 500 };
    }
    throw new Error("Server Connection Failed");
  }
};
