import React from "react";
import SearchInput from '../CentralPane/SearchInput.js';
import FoodItemsDisplay from '../CentralPane/FoodItemsDisplay.js';
import CustomerJourney from '../CentralPane/CustomerJourney.js';
import Testimonials from '../CentralPane/Testimonials.js';
import Alert from '../Alert/Alert.js';
import './Dashboard.css';


export default function Dashboard(){
    return(
        <>
           <SearchInput />
           <FoodItemsDisplay /> 
           <CustomerJourney />
           <Testimonials />     
        </>
    )    
}
