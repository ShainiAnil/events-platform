import React, { useState, useEffect } from "react";
import { TextInput } from "../TextInput/TextInput";
import { Select } from "./Select";
import "../TextInput/TextInput.css";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../utils/api";

const roles = ["user", "admin"];

const SignUpNew = () => {
  const navigate = useNavigate();
  const [dbError, setDbError] = useState("");
 
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [errorFields, setErrorFields] = useState({
    username: false,
    email: false,
    password: false,
    role: false,
  });

  const handleChange = (event) => {
    setFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (isFormValid()) {
      createNewUser(fields)
      .then((res) => {
        if (res.data.message==="Account has been created") {
          setDbError("")
          navigate("/");
        } 
      
      })
      .catch(error => {
        
        
        if (error.response && error.response.data && error.response.data.message) {
          
          setDbError(error.response.data.message); // Set the error message state
        } 
        // else {
        //   setErrorMessage('An unexpected error occurred.'); // Set a generic error message
        // }
      });
      
         
      return
    }
    console.log("Invalid");
  };

  const isFormValid = () => {
    const errors = {
      username: false,
      email: false,
      password: false,
      role: false,
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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p className="caption">Please fill the form.</p>
        {dbError && <div className="error">{dbError}</div>}
        <TextInput
          handleChange={handleChange}
          errorFields={errorFields}
          label="Name"
          id="username"
          name="username"
          type="text"
        />

        <TextInput
          handleChange={handleChange}
          errorFields={errorFields}
          label="Email"
          id="email"
          name="email"
          type="email"
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
        <Select
          label="role"
          roles={roles}
          handleChange={handleChange}
          errorFields={errorFields}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpNew;
