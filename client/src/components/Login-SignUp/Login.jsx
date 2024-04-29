import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Login.css";
import { login } from "../../utils/api";

export const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dbError, setDbError] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { email };

        if (!email || !password) {
          setInputError(true);
          setDbError(false);
        } else {
          login(formData).then((userData) => {
            setInputError(false);
            if (!userData) {
              console.log("no data");
              setDbError(true);
            } else {
              console.log("data found");
              setUser(userData);
              setDbError(false);
              navigate("/");
            }
          });
        }
  };

  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button>Log in</button>
        
        {dbError && <div className="error">Error logging in</div>}
        {inputError && (
          <div className="error">Please fill in all fields</div>
        )}
      </form>

      <br />

      <p>New user?</p>
      <Link to={"/signup"}>
        <p className="underlined">Sign up</p>
      </Link>
    </div>
  );
};
