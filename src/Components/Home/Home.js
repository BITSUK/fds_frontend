import React from "react";
import SearchInput from '../CentralPane/SearchInput.js';
import FoodItemsDisplay from '../CentralPane/FoodItemsDisplay.js';
import CustomerJourney from '../CentralPane/CustomerJourney.js';
import Testimonials from '../CentralPane/Testimonials.js';
import './Home.css';


export default function Home(){
    return(
        <>
           <SearchInput />
           <FoodItemsDisplay /> 
           <CustomerJourney />
           <Testimonials />     
        </>
    )    
}
