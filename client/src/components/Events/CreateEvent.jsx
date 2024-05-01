import React, { useState, useEffect } from "react";
import { TextInput } from "../TextInput/TextInput";
import { Select } from "../../components/Login-SignUp/Select";
import "../TextInput/TextInput.css";
import { useNavigate } from "react-router-dom";
import { createNewEvent, getCategory } from "../../utils/api";
import "../TextInput/TextInput.css";
const CreateEvent = () => {
  const navigate = useNavigate();
  const [dbError, setDbError] = useState("");
  const [fields, setFields] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    category: "",
    price: "",
    
    startDate: "",
    endDate: "",
  });
  const [errorFields, setErrorFields] = useState({
    title: false,
    description: false,
    location: false,
    image: false,
    category: false,
    price: false,
    
    startDate: false,
    endDate: false,
  });
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getCategory().then((data) => {
      setCategory(data);
    });
  }, []);
  console.log("from createEvent.jss, category=", category);
  const handleChange = (event) => {
    setFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("fields from create event", fields)
    if (isFormValid()) {
      createNewEvent(fields)
        .then((response) => {
          if (response) {
            setDbError("");
            toast.success("Event created successfully!");
            //navigate("/");
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            // Check if the error response contains a message
            console.log("errrrr", error.response.data.message);
            setDbError(error.response.data.message); // Set the error message state
          }
          // else {
          //   setErrorMessage('An unexpected error occurred.'); // Set a generic error message
          // }
        });
    }
    console.log("Invalid"); 
  };

  const isFormValid = () => {
    const errors = {
      title: false,
      description: false,
      location: false,
      image: false,
      category: false,
      price: false,
      
      startDate: false,
      endDate: false,
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
    if (value === "" ) {
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
        <h1>Create new event</h1>
        <p className="caption">Please fill the form.</p>
        {dbError && <div className="error">Error signing up</div>}
        <TextInput
          handleChange={handleChange}
          errorFields={errorFields}
          label="Title"
          id="title"
          name="title"
          type="text"
        />
        <div className="input-section">
          <label htmlFor="description">
            Description <span className="danger">*</span>
          </label>
          <textarea
            onChange={handleChange}
            id="description"
            name="description"
          />

           {errorFields["description"] && <p className="danger">Description is required</p>} 
        </div>

        <TextInput
          handleChange={handleChange}
          errorFields={errorFields}
          label="Location"
          id="location"
          name="location"
          type="text"
          autocomplete="on"
        />
        <TextInput
          handleChange={handleChange}
          errorFields={errorFields}
          label="Image URL"
          id="image"
          name="image"
          type="text"
          autocomplete="on"
        />
        <div className="input-section">
          <label htmlFor="category">
            Category <span className="danger">*</span>
          </label>
        <select name="category" onChange={handleChange}>
          <option value="">Select</option>
          {category.map((item) => (
            <option key={item._id} value={item._id}>
              {item.category}
            </option>
          ))}
        </select>
        {errorFields["category"] && <p className="danger"> Category is required</p>} 
        </div>
        <TextInput
          handleChange={handleChange}
          errorFields={errorFields}
          label="Price"
          id="price"
          name="price"
          type="text"
          autocomplete="on"
        />
        <TextInput
          handleChange={handleChange}
          errorFields={errorFields}
          label="Start Date"
          id="startDate"
          name="startDate"
          type="datetime-local"
          autocomplete="on"
        />
        <TextInput
          handleChange={handleChange}
          errorFields={errorFields}
          label="End Date"
          id="endDate"
          name="endDate"
          type="datetime-local"
          autocomplete="on"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEvent;
