import { useContext, useEffect, useRef, useState } from "react";
import "../TextInput/TextInput.css";
import { Link, useNavigate, redirect } from "react-router-dom";
import { login } from "../../utils/api";
import { TextInput } from "../TextInput/TextInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../context/UserContext";

const LoginNew = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [dbError, setDbError] = useState("");
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [errorFields, setErrorFields] = useState({
    email: false,

    password: false,
  });

  const handleChange = (event) => {
    setFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      login(fields)
        .then((response) => {
          if (response.data) {
            setDbError("");
            setUser(response.data);

            // localStorage.setItem("token", data.accessToken);
            navigate("/");
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            setDbError(error.response.data.message); // Set the error message state
          }
        });
    }

    return;
  };

  const isFormValid = () => {
    const errors = {
      email: false,

      password: false,
    };

    Object.keys(fields).map((key) => {
      if (fields[key] === "") {
        errors[key] = true;
      }
    });

    setErrorFields(errors);
    if (Object.values(errors).some((value) => value === true)) {
      return false;
    }
    return true;
  };
  const isFormValidOnBlur = (event) => {
    const { name, value } = event.target;

    let error = false;
    if (value === "") {
      error = true;
    }

    setErrorFields((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  return (
    <>
      <div className="login-container">
        <div className="login-title">
          <p>Sign In</p>
        </div>
        <form className="login-input-container">
          <TextInput
            handleChange={handleChange}
            errorFields={errorFields}
            label="Email"
            id="email"
            name="email"
            type="email"
            autocomplete="on"
          />

          <TextInput
            handleChange={handleChange}
            errorFields={errorFields}
            label="Password"
            id="password"
            name="password"
            type="password"
            autocomplete="on"
          />

          <div className="input-div">
            <button type="button" onClick={handleLogin}>
              Sign In
            </button>
          </div>

          {dbError && <div className="error">{dbError}</div>}
        </form>
        <div className="sign-upnav">
          <div>
            <p>
              New to EventVibe?
              <Link to="/signup">
                <span className="signup-link"> Sign Up Now</span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />

      {/* </div> */}
    </>
  );
};

export default LoginNew;
