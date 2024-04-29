import React, { useEffect, useState } from "react";
import { getEvents } from "../../utils/api";
import { Link } from "react-router-dom";
import "./Events.css";


export const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    getEvents().then((data) => {
      setEvents(data);
    });
    console.log("from event.jss", events.length);
    setIsLoading(false);
  }, []);

  if (events.length === 0)
    return (
      <div className="isLoading">
        <p>Loading...</p>
      </div>
    );
    
  return (
    <>
      <div className="main">
        <h1>Your Ultimate Guide to What's Happening Near You</h1>
        <ul className="cards">
        {events.map(
            ({
              _id,
              title,
              startDate,
              endDate,
              description,
              location,
              price,
              image,
              attendees,
            }) => {
              return (
                <li className="cards_item" key={_id}>
                <div className="card">
                  <div className="card_image">
                    <img src={image} />
                  </div>
                  <div className="card_content">
                    <h2 className="card_title">{title}</h2>
                    <p className="card_text">
                      {description}
                    </p>
                    <Link to={`/events/${_id}`}>
                    <button className="btn card_btn">Read More</button></Link>
                  </div>
                </div>
              </li>
        
           );
          }
        )}
        </ul>
      </div>

      <h3 className="made_by">Made with ♡</h3>
    </>
  );
};
