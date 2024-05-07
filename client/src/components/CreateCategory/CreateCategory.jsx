import React, { useState, useEffect, useRef } from "react";
import { TextInput } from "../TextInput/TextInput";
import { Select } from "../../components/Login-SignUp/Select";
import "../TextInput/TextInput.css";
import { useNavigate } from "react-router-dom";
import { createNewCategory} from "../../utils/api";
import "../TextInput/TextInput.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleChange = (event) => {
    setField((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
        createNewCategory(field)
        .then(() => {
          setDbError("");
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
    toast.success("Category created successfully!");
    formRef.current.reset();
    setDbError("");
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
        {dbError && <div className="error">Database error</div>}
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
