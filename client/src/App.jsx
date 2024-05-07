import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/NavBar/NavBar";
import { Events } from "./components/Events/Events";
import { EventCard } from "./components/EventCard/EventCard";

import { UserProvider } from "./context/UserContext";
import SignUpNew from "./components/Login-SignUp/SignUpNew";
import LoginNew from "./components/Login-SignUp/LoginNew";
import CreateEvent from "./components/Events/CreateEvent";
import Footer from "./components/Footer/Footer";
import MyEvents from "./components/Events/MyEvents";
import CreateCategory from "./components/CreateCategory/CreateCategory";

const App = () => {
  return (
    <>
      <UserProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events" element={<Events />} />
          <Route path="/signup" element={<SignUpNew />} />
          <Route path="/login" element={<LoginNew />} />
          <Route path="/events/:_id" element={<EventCard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/my-events" element={<MyEvents />} />
        </Routes>
        <Footer />
      </UserProvider>
    </>
  );
};

export default App;
