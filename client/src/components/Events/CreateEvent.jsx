import React, { useState, useEffect, useRef, useContext } from "react";
import { TextInput } from "../TextInput/TextInput";
import { Select } from "../../components/Login-SignUp/Select";
import "../TextInput/TextInput.css";
import { useNavigate } from "react-router-dom";
import { createNewEvent, getCategory } from "../../utils/api";
import "../TextInput/TextInput.css";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [dbError, setDbError] = useState("");
  const { user } = useContext(UserContext);

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
  const formRef = useRef(null);
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
  useEffect(() => {
    // Check if user is not logged in, redirect to login page

    if (user.role !== "admin") {
      navigate("/login");
    }
  }, []);
  const handleChange = (event) => {
    setFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      createNewEvent(fields)
        .then(() => {
          toast.success("Event created successfully!");
          formRef.current.reset();
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
      <form onSubmit={handleSubmit} ref={formRef}>
        <h1>Create new event</h1>
        <p className="caption">Please fill the form.</p>
        {dbError && <div className="error">{dbError}</div>}
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

          {errorFields["description"] && (
            <p className="danger">Description is required</p>
          )}
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
          {errorFields["category"] && (
            <p className="danger"> Category is required</p>
          )}
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
      <ToastContainer />
    </div>
  );
};

export default CreateEvent;
