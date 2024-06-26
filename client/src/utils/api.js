import axios from "axios";

//const BASE_URL = "http://localhost:3007/api";
const BASE_URL = "https://events-platform-amlk.onrender.com/api";

export const getEvents = () => {
  return axios.get(`${BASE_URL}/events`).then((response) => {
    return response.data.eventList;
  });
};

export const getCategory = () => {
  return axios.get(`${BASE_URL}/categories`).then((response) => {
    return response.data;
  });
};

export const createNewCategory = (addNewCategory) => {
  return axios
    .post(`${BASE_URL}/categories`, addNewCategory)
    .then((response) => {
      return response;
    });
};
export const getEventById = (_id) => {
  return axios.get(`${BASE_URL}/events/${_id}`).then((response) => {
    return response.data;
  });
};

export const createNewEvent = (addNewEvent) => {
  return axios.post(`${BASE_URL}/events`, addNewEvent).then((response) => {
    return response;
  });
};
export const editEvent = (eventData) => { console.log("ippol:",eventData)
  return axios.put(`${BASE_URL}/events`, eventData)
  .then((response) => {console.log("hi")
    return response;
  });
};
export const createNewUser = (addNewUser) => {
  return axios
    .post(`${BASE_URL}/auth/register`, addNewUser)
    .then((response) => {
      return response;
    });
};
// export const createNewUser = async (addNewUser) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/auth/register`, addNewUser);
//     console.log("hiiii", response.data.message);
//     return response;
//   } catch (error) {
//     console.error("Error while creating new user:", error);
//     throw error; // Rethrow the error to handle it in the calling code
//   }
// };
export const login = (formData) => {
  return axios.post(`${BASE_URL}/auth/login`, formData).then((response) => {
    return response;
  });
};
export const myEvents = (formData) => {
  return axios
    .post(`${BASE_URL}/auth/myEvents?page=1&limit=10`, formData)
    .then((response) => {
      return response.data;
    });
};
export const addEvent = (formData) => {
  console.log("hello it's me addEvent", formData);
  return axios.post(`${BASE_URL}/auth/addEvent`, formData).then((response) => {
    return response.data;
  });
};
export const updateAttending = (_id, user) => {
  return axios.patch(`${BASE_URL}/events/${_id}`, user).then((response) => {
    return response.data;
  });
};

export const extractTokens = (_id, code) => {
  return axios.post(`${BASE_URL}/google-auth/${_id}`, code).then((response) => {
    return response.data;
  });
};
