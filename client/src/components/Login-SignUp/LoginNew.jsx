import { useContext, useEffect, useRef, useState } from "react";
import "../TextInput/TextInput.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/api";
import { TextInput } from "../TextInput/TextInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../context/UserContext";

const LoginNew = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [dbError, setDbError] = useState(false);
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
    setDbError(false);
    
    if (isFormValid()) {
      login(fields).then((data) => {
        if (data) {
          console.log("data found",data);
          //setUser(userData);
          setDbError(false);
          toast.success("Successfuly logged in");
         setUser(data)
         // localStorage.setItem("token", data.accessToken);
          navigate("/");
        } 
       
      });
      
    }
    
    setDbError(true);
     console.log("Invalid");
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
          <div className="input-div">
            <TextInput
              handleChange={handleChange}
              errorFields={errorFields}
              label="Email"
              id="email"
              name="email"
              type="email"
              autocomplete="on"
            />
          </div>
          <div className="input-div">
            <TextInput
              handleChange={handleChange}
              errorFields={errorFields}
              label="Password"
              id="password"
              name="password"
              type="password"
              autocomplete="on"
            />
            <div>
              <span className="error error-username"></span>
            </div>
          </div>
          <div className="button-div">
            <button type="button" onClick={handleLogin}>
              Sign In
            </button>
          </div>
          {/* <Link to="/forgotpassword">
              <div className="forgot-pwd">
                <p>Forgot Password?</p>
              </div>
            </Link> */}
          {dbError && <div className="error">Data base error</div>}
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
