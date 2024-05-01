import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { getEventById } from "../../utils/api";
import "./EventCard.css";
import { formatDate, convertTimestamp } from "../../utils/util";
import BookEvent from "../BookEvent/BookEvent";

export const EventCard = () => {
  const { user } = useContext(UserContext);

  const [currentEvent, setCurrentEvent] = useState({});
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userAttending, setUserAttending] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const { _id } = useParams();
  const eventId = _id;
  useEffect(() => {
    setIsLoading(true);
    getEventById(_id).then((eventData) => {
      setCurrentEvent(eventData);
      setAttendees(eventData.attendees);
      eventData.attendees.map((attendee) => {
        if (attendee === user._id) {
          setUserAttending(true);
        }
      });

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
            <strong>On</strong> <br />
            &#128197; {convertTimestamp(currentEvent.startDate).date}
          </p>
          <p>
            <strong>Time</strong> <br />
            <span className="clock-face">&#128337;</span>
            {convertTimestamp(currentEvent.startDate).time}
            &nbsp;-
            {convertTimestamp(currentEvent.endDate).time}
          </p>

          <p>
            <strong>Location</strong> <br />
            📍 {currentEvent.location}
          </p>
          <p>
            
            {currentEvent.description}
          </p>
          {!user && (
            <div className="login-signup">
              <p>
                <Link to="/login">
                  <span className="link">Log in</span>
                </Link>
              </p>
            </div>
          )}
          {user && !userAttending && (
            <BookEvent
              eventId={eventId}
              userId={user._id}
              setUserAttending={setUserAttending}
              attendees={attendees}
              setAttendees={setAttendees}
            />
          )}
          {user && userAttending && (
            <butten>cancel</butten>
            // <GoogleCalendar/>
          )}
        </div>
      </div>
    </div>
  );
};
