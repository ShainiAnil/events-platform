import React, { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import { addEvent } from '../../utils/api';
import "./BookEvent.css"
const BookEvent = ({ setUserAttending,eventId,userId, setAttendees}) => {
    const { user } = useContext(UserContext);
    
    const handleClick = () => {console.log("clicked")
    console.log("eventId=",eventId, "userId=",userId)
      const formData = {"eventId": eventId, "userId": userId}
      setUserAttending(true)
      addEvent(formData).then((data) => {
        console.log("data after booking", data)
      });
      setAttendees((prev) => {
        return [user._id, ...prev];
      });
      alert(`congrats!`);
    };
  
    return (
      <div className="book-container">
       <button  onClick={handleClick}>Book Now</button>
      </div>
    );
}

export default BookEvent