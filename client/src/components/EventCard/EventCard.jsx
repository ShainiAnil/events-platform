import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { getEventById } from "../../utils/api";
import "./EventCard.css";
import { formatDate } from "../../utils/util";

export const EventCard = () => {
  const { user } = useContext(UserContext);

  const [currentEvent, setCurrentEvent] = useState({});
  const [attending, setAttending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAttending, setIsUserAttending] = useState(false);
  const [clickedTicketBtn, setClickedTicketBtn] = useState(false);
  const { _id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getEventById(_id).then((eventData) => {
      setCurrentEvent(eventData);
      setAttending(eventData.attendees);
      eventData.attendees.map((attendee) => {
        if (attendee.email === user.email) {
          setIsUserAttending(true);
        }
      });
      console.log("event....=",currentEvent)
      setIsLoading(false);
    });
  }, [_id]);

  if (isLoading)
    return (
      <div className="isLoading">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="main">
    <h1 className="heading">{currentEvent.title}</h1>
    <div className="container">
      <div className="img-container">
        <img className="event-image" src={currentEvent.image} alt="" />
      </div>
      <div className="data-container">
       
        
        <p>
          <strong>Date</strong> <br />
          🗓️ {formatDate(currentEvent.startDate)}
        </p>

        <p>
          <strong>Location</strong> <br />
          📍 {currentEvent.location}
        </p>
        <p>
          <strong>About this event</strong> <br />
          {currentEvent.description}
        </p>

        {user && attendees.length !== 0 && (
          <p>
            <strong>Who's going:</strong>
          </p>
        )}
        <ul>
          {user &&
            attendees.map(({ _id, name, email }) => {
              return (
                <li key={_id}>
                  {email === user.email ? (
                    <p>
                      👤 {name} <strong>(me!)</strong>
                    </p>
                  ) : (
                    <p>👤 {name}</p>
                  )}
                </li>
              );
            })}
        </ul>
        <p>
          <strong>Price</strong> <br />
          🛒 {currentEvent.price}
        </p>

        {!user && (
          <div className="login-signup">
          <p>
            <Link to={"/signup"}>
             <span className="link">Sign up</span> 
            </Link>{" "}
            or{" "}
            <Link to={"/login"} >
            <span className="link">Log in</span>
            </Link>
          </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};