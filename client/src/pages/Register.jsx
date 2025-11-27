import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastMessage } from "../scripts/toastScript.js";
import { registerSubmit } from "../scripts/registerScript.js";
import { useNavigate } from "react-router-dom";
import { useGlobalAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const [userLoginData, setUserLoginData] = useState({ user: "", pwd: "" });
  const [hintShown, setHintShown] = useState(false);
  const { setUser, setAuthToken, setIsLoggedIn } = useGlobalAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (userLoginData.pwd.includes(" ")) {
      toastMessage("Password cannot contain spaces");
      return;
    }

    try {
      const response = await registerSubmit(userLoginData);
      if (response === 409) {
        toastMessage("Username already taken!");
        return;
      } else if (response === 400) {
        toastMessage("Username and Password are required.");
        return;
      }

      setUser({
        username: response.userData.username,
        user_id: response.userData.user_id,
      });
      setAuthToken(response.accessToken);
      setUserLoginData({ user: "", pwd: "" });
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      toastMessage("An unexpected error occurred, please try again.");
    }
  };

  return (
    <section className="login-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleRegister} className="login-form" action="">
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
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <ToastContainer autoClose={2000} />
    </section>
  );
};

export default Register;
