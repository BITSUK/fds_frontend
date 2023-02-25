import React from "react";
import DashboardDefault from './DashboardDefault.js';
import DashboardCust from './DashboardCust.js';
import DashboardRest from './DashboardRest.js';
import { UserContext } from '../../Contexts/UserContext.js';
import { useContext } from 'react';
import './Dashboard.css';


export default function Dashboard(){
    const [userContext, setUserContext] = useContext(UserContext);	

    //Dependiing upon user type show different dashboard
    return(
        <>
           {(userContext.role == "customer")   && <DashboardCust />} 
           {(userContext.role == "restaurant") && <DashboardRest />}
           {(userContext.role == "default")    && <DashboardDefault />}
        </>
    )    
}
