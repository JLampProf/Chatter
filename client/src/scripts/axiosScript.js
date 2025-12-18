import axios, { HttpStatusCode } from "axios";

const BACK_URL = import.meta.env.VITE_BACK_URL;

export const intercept = axios.create({
  baseURL: BACK_URL,
  withCredentials: true,
});

intercept.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.config?._retry) return Promise.reject(error);
    if (error.response.status === HttpStatusCode.Forbidden) {
      try {
        const newToken = await axios.post(`${BACK_URL}/api/refresh`, {
          withCredentials: true,
        });
        const accessToken = newToken.data.accessToken;
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        error.config._retry = true;
        return intercept(error.config);
      } catch (error) {
        if (error?.response?.status === 400) {
          //At this point, alert user of fraudulent activity through email (Not going to be a feature)
          return { error: true, status: 400 }; //TODO: Revisit
        }
        console.log("Unable to refresh", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
