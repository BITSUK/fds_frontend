import React from "react";
import process from './images/process.jpg'
import './CustomerJourney.css';
import {Link} from "react-router-dom";

export default function CustomerJourney(){

    return(
        <>
            <div className="customer-journey">
				<div><Link to="/journey"><img src={process} alt=""/></Link></div>			
			</div>
        </>
    )
}