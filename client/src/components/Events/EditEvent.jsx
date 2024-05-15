import React, { useState, useEffect, useRef, useContext } from "react";
import { TextInput } from "../TextInput/TextInput";
import { Select } from "../../components/Login-SignUp/Select";
import "../TextInput/TextInput.css";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, getCategory, editEvent } from "../../utils/api";
import "../TextInput/TextInput.css";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

const initialFieldsState = {
  title: "",
  description: "",
  location: "",
  image: "",
  category: "",
  price: "",
  startDate: "",
  endDate: "",
};


const EditEvent = () => {
  const navigate = useNavigate();
  const [dbError, setDbError] = useState("");
  const { user } = useContext(UserContext);
  const { _id } = useParams();
  const [event, setEvent] = useState({});
  const [fields, setFields] = useState(initialFieldsState);
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
    getEventById(_id).then((data) => {
      setEvent(data);
      setFields(data);
    });
  }, []);

  //   useEffect(() => {
  //     // Check if user is not logged in, redirect to login page

  //     if (user.role !== "admin") {
  //       navigate("/login");
  //     }
  //   }, []);

  const handleChange = (event) => {
    setFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleCheckbox = (event) => {
    let newCategory = [...fields.category];
    if (event.target.checked) {
      newCategory.push(event.target.value);
    } else {
      newCategory = newCategory.filter((item) => item !== event.target.value);
    }
    setFields((prev) => ({
      ...prev,
      category: newCategory,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
        setFields(prev=>({
            eventId:_id,
            ...prev
        }))
      
       editEvent(fields)
        .then(() => {
          toast.success("Event created successfully!");
          setFields(initialFieldsState)
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
        <h1>Edit event</h1>
        <p className="caption"></p>
        {dbError && <div className="error">{dbError}</div>}
        <div className="input-section">
          <label htmlFor="title">
            Title <span className="danger">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={fields.title}
          />
          {errorFields["title"] && <p className="danger">Title is required</p>}
        </div>
        <div className="input-section">
          <label htmlFor="description">
            Description <span className="danger">*</span>
          </label>
          <textarea
            onChange={handleChange}
            id="description"
            name="description"
            value={fields.description}
          />

          {errorFields["description"] && (
            <p className="danger">Description is required</p>
          )}
        </div>
        <div className="input-section">
          <label htmlFor="location">
            Location <span className="danger">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={handleChange}
            value={fields.location}
          />
          {errorFields["location"] && (
            <p className="danger">Location is required</p>
          )}
        </div>
        <div className="input-section">
          <label htmlFor="location">
            Image Url <span className="danger">*</span>
          </label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={handleChange}
            value={fields.image}
          />
          {errorFields["image"] && (
            <p className="danger">Image Url is required</p>
          )}
        </div>

        <div className="input-section ">
          <label htmlFor="category">
            Category <span className="danger">*</span>
          </label>
          <div className="radio-groups">
            {category.map((item) => {
              const isChecked = fields.category.includes(item._id);
              return (
                <div key={item._id} className="category-label">
                  <input
                    type="checkbox"
                    name={item.category}
                    value={item._id}
                    id={item.category}
                    checked={isChecked}
                    onChange={handleCheckbox}
                  />
                  <label htmlFor={item.category} className="radio-buttons">
                    {item.category}
                  </label>
                </div>
              );
            })}

            {/* {errorFields["category"] && (
              <p className="danger">Category is required</p>
            )} */}
          </div>
        </div>
        {/* <div className="input-section">
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
        </div> */}
        <div className="input-section">
          <label htmlFor="price">
            Price <span className="danger">*</span>
          </label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={handleChange}
            value={fields.price}
          />
          {errorFields["price"] && <p className="danger">Price is required</p>}
        </div>
        <div className="input-section">
          <label htmlFor="startDate">
            Start Date <span className="danger">*</span>
          </label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            onChange={handleChange}
            value={fields.startDate.substring(0, 16)}
          />
          {errorFields["startDate"] && (
            <p className="danger">Start Date is required</p>
          )}
        </div>

        <div className="input-section">
          <label htmlFor="endDate">
            End Date <span className="danger">*</span>
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            onChange={handleChange}
            value={fields.endDate.substring(0, 16)}
          />
          {errorFields["endDate"] && (
            <p className="danger">End Date is required</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditEvent;
