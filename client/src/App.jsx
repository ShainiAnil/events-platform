import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login-SignUp/Login";
import { Navbar } from "./components/NavBar/NavBar";
import { Events } from "./components/Events/Events";
import { EventCard } from "./components/EventCard/EventCard";


import { UserProvider } from "./context/UserContext";
import SignUpNew from "./components/Login-SignUp/SignUpNew";
import LoginNew from "./components/Login-SignUp/LoginNew";


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
        </Routes> 
      </UserProvider>
    </>
  );
};

export default App;
