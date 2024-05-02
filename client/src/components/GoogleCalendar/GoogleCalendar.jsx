import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { extractTokens } from "../../utils/api";
import "../BookEvent/BookEvent.css";

const GoogleCalendar = ({ eventId }) => {
  const login = useGoogleLogin({
    onSuccess: (googleResponse) => {
      const { code } = googleResponse;
      console.log("login successful", { code });

      extractTokens(eventId, { code }).then((serverResponse) => {
        if (serverResponse) {
          console.log("event added to calendar", serverResponse);
        }
        alert("Event added to Google calendar");
      });
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
    onError: (err) => {
      console.log("Login Failed", err);
      alert("Google login failed");
    },
  });

  return (
    <>
      <div className="book-container">
        <button onClick={() => login()}>Add to Calendar</button>
      </div>
    </>
  );
};

export default GoogleCalendar;
