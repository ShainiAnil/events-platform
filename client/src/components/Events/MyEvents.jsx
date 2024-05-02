import React, { useEffect, useState, useContext } from "react";
import { myEvents } from "../../utils/api";
import { Link } from "react-router-dom";
import "./Events.css";
import UserContext from "../../context/UserContext";
import { convertTimestamp } from "../../utils/util";
const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [myEventsCount, setMyEventsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const userId = user._id;

  useEffect(() => {
    setIsLoading(true);
    myEvents({ userId }).then((data) => {
      setEvents(data.myEventsList);
      setMyEventsCount(data.myEventsCount);
    });

    setIsLoading(false);
  }, []);

  // if (events.length === 0)
  //   return (
  //     <div className="isLoading">
  //       <p>Loading...</p>
  //     </div>
  //   );
  if (events.length === 0 && myEventsCount === 0)
    return (
      <div className="isLoading">
        <p>No Bookings</p>
      </div>
    );
  return (
    <>
      <div className="main">
        <h1>You have {myEventsCount} Bookings</h1>
        <ul className="cards">
          {events.map(
            ({ _id, title, startDate, location, image, attendees }) => {
              return (
                <li className="cards_item" key={_id}>
                  <div className="card">
                    <div className="card_image">
                      <img src={image} />
                    </div>
                    <div className="card_content">
                      <h2 className="card_title">{title}</h2>
                      <p className="card_text">
                        🧑 Attendees:<span className="card-info">{attendees.length}</span>
                      </p>
                      <p className="card_text">
                        📍<span className="card-info">{location}</span>
                      </p>
                      <p className="card_text">
                      🗓️<span className="card-info">{convertTimestamp(startDate).date}</span>
                      </p>
                      <p className="card_text">
                        ⌚<span className="card-info">{convertTimestamp(startDate).time}</span>
                      </p>
                      <Link to={`/events/${_id}`}>
                        <button className="btn card_btn">Read More</button>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </>
  );
};

export default MyEvents;
