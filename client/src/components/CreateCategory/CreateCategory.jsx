import React, { useState, useEffect, useRef, useContext } from "react";
import { TextInput } from "../TextInput/TextInput";

import "../TextInput/TextInput.css";
import { useNavigate } from "react-router-dom";
import { createNewCategory} from "../../utils/api";
import "../TextInput/TextInput.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../context/UserContext";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [dbError, setDbError] = useState("");
  const [field, setField] = useState({
    category: "",
  });
  const formRef = useRef(null);
  const [errorFields, setErrorFields] = useState({
    category: false,
  });
  const {user} = useContext(UserContext);
  useEffect(() => {
    // Check if user is not logged in, redirect to login page

    if (user.role !== "admin") {
      navigate("/login");
    }
  }, []);
  const handleChange = (event) => {
    setField((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) { 
    setDbError("");
        createNewCategory(field)
        .then(() => {
          setDbError("");
          toast.success("Category created successfully!");
          formRef.current.reset();
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
   
  };

  const isFormValid = () => {
    const errors = {
     category: false,
    };

    Object.keys(field).map((key) => {
      if (field[key] === "") {
        errors[key] = true;
      }
    });

    setErrorFields(errors);
    if (Object.values(errors).some((value) => value === true)) {
      return false;
    }
    return true;
  };
//   const isFormValidOnBlur = (event) => {
//     const { name, value } = event.target;

//     let error = false;
//     if (value === "") {
//       error = true;
//     }

//     setErrorFields((prev) => ({
//       ...prev,
//       [name]: error,
//     }));
//   };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} ref={formRef}>
        <h1>Create new Category</h1>
        <p className="caption">Please fill the form.</p>
        {dbError && <div className="error">{dbError}</div>}
        <TextInput
          handleChange={handleChange}
          errorFields={errorFields}
          label="category"
          id="category"
          name="category"
          type="text"
        />
       
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateCategory;
