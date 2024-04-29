
import axios from "axios";

const BASE_URL = "http://localhost:3007/api";

export const getEvents = () => {
   return axios.get(`${BASE_URL}/events`).then((response) => {
      console.log("hi from api", response.data.evenlist)
       return response.data.eventList
   });
}

export const getEventById = (_id) => {
  return axios.get(`${BASE_URL}/events/${_id}`).then((response) => {
    
    return response.data;
  });
};

export const createNewEvent = (addNewEvent) => {
  return axios.post(`${BASE_URL}/events`, addNewEvent).then((response) => {
    return response.data;
  });
};

export const createNewUser = (addNewUser) => {
  return axios.post(`${BASE_URL}/auth/register`, addNewUser).then((response) => {
    console.log(response.data)
    return response.data;
  });
};

export const login = (formData) => { console.log("hellooo",formData)
  return axios.post(`${BASE_URL}/auth/login`, formData).then((response) => {
    console.log(response)
    return response.data;
  });
};

export const updateAttending = (_id, user) => {
  return axios.patch(`${BASE_URL}/events/${_id}`, user).then((response) => {
    return response.data;
  });
};

export const extractTokens = (_id, code) => {
  return axios.post(`${BASE_URL}/auth/${_id}`, code).then((response) => {
    return response.data;
  });
};
