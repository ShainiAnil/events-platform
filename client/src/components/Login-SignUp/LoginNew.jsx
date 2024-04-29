import { useContext, useEffect, useRef, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/api";
import { TextInput } from "./TextInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../context/UserContext";

const LoginNew = () => {
    const navigate = useNavigate();
    const [dbError, setDbError] = useState(false);
    const [fields, setFields] = useState({
      username: "",
        password: ""
    });
    const [errorFields, setErrorFields] = useState({
      username: false,
      
      password: false
    
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
        console.log("insidevvvv")
        login(fields).then((data) => {
           
            if (!data) {
              console.log("no data");
              setDbError(true);
            } else {
              console.log("data found");
              //setUser(userData);
              setDbError(false);
              navigate("/");
            }
          });
  
        }
       
      
      console.log("Invalid");
    };
  
    const isFormValid = () => {
      const errors = {
        username: false,
       
        password: false
       
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
              label="Username"
              id="username"
              name="username"
              type="username"
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
