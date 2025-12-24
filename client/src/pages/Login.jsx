/**
 * Login.jsx
 *
 * - Collects and Sends the login data to the backend
 * - Stores a successful response in state
 * - Moves the user to the main application page.
 */

import { useState } from "react";
import { handleLogin } from "../scripts/loginScript.js";
import { useGlobalAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toastMessage } from "../scripts/toastScript.js";
import { socket } from "../scripts/socket.js";

const Login = () => {
  const [userLoginData, setUserLoginData] = useState({ user: "", pwd: "" });
  const [hintShown, setHintShown] = useState(false);
  const { setUser, setAuthToken, setIsLoggedIn, setFriendList } =
    useGlobalAuth();
  const navigate = useNavigate();

  /**
   * - handleSubmit(e)
   *
   * - Steps:
   *  - 1: Send data to back end
   *  - 2: Store response in state
   *  - 3: Store accessToken in State
   *  - 4: Set input fields to empty strings
   *  - 5: Set user to logged in
   *  - 6: Navigate to main page, with main app now loaded
   *
   *  - Shows a toast if unsuccessful
   */

  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevents page reload on form submission
    try {
      const response = await handleLogin(userLoginData);

      if (response?.error) {
        switch (response.status) {
          case 400:
            toastMessage("Username or Password missing");
            break;
          case 401:
            toastMessage("Username or Password incorrect. Please try again");
            break;
          case 500:
            toastMessage("Server temporarily unavailable. Please try again!");
            break;
        }
        return;
      }

      setUser({
        username: response.userData.username,
        user_id: response.userData.user_id,
        roomId: response.userData.room_id,
      });
      setFriendList(response.friendList);
      setAuthToken(response.accessToken);
      setUserLoginData({ user: "", pwd: "" });
      setIsLoggedIn(true);
      socket.connect();
      socket.emit("joinRoom", response.userData.room_id);
      navigate("/");
    } catch (error) {
      toastMessage("Unexpected error, please try again");
    }
  };

  return (
    <section className="login-page">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit} action="">
        <label htmlFor="user">Username:</label>
        <input
          onFocus={() => {
            if (!hintShown) {
              setHintShown(true);
              toastMessage("Username and Password are case-sensitive");
            }
          }}
          onChange={(e) =>
            // Collects the data from the input
            setUserLoginData({ ...userLoginData, user: e.target.value })
          }
          id="user"
          name="user"
          className="login-user-input"
          type="text"
          value={userLoginData.user}
        />
        <label className="login-pass-label" htmlFor="pass">
          Password:
        </label>
        <input
          onChange={(e) =>
            // Collects the data from the input
            setUserLoginData({ ...userLoginData, pwd: e.target.value })
          }
          id="pass"
          name="pass"
          className="login-pass-input"
          type="password"
          value={userLoginData.pwd}
        />
        <div>
          <button type="button" onClick={() => navigate("/")}>
            Back
          </button>
          <button type="submit">Login</button>
        </div>
      </form>
      <ToastContainer autoClose={2000} />
    </section>
  );
};

export default Login;
