import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { addEvent } from "../../utils/api";
import "./BookEvent.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BookEvent = ({ setUserAttending, eventId, userId, setAttendees }) => {
  const { user } = useContext(UserContext);

  const handleClick = () => {
    const formData = { eventId: eventId, userId: userId };
    setUserAttending(true);
    addEvent(formData).then((data) => {
      toast.success("Booking confirmed!");
      alert("Booking confirmed!");
    });
    setAttendees((prev) => {
      return [user._id, ...prev];
    });
  };

  return (
    <>
      <div className="book-container">
        <button onClick={handleClick}>Book Now</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default BookEvent;
