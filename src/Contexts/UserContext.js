import { createContext } from 'react';

export const defaultUser = {
    uid: "Guest",
    name: "Guest",
    role: "default",
    mobile: "9965532235",
    email: "xyz@gmail.com",
    address: "Delhi",
    isLoggedIn: false,
    train: "",
    trainName : "",
    station: "",
    stationName: "",
    jdate: "",
    restaurant: "",
    restaurantName : ""
}

export const UserContext = createContext(defaultUser);
