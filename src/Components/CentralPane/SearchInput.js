import React from "react";
import './SearchInput.css';
import { AlertContext } from '../../Contexts/AlertContext.js';
import {useContext} from "react";
import { Link, useNavigate} from "react-router-dom";

// ============================================================================
// Dislays Search Train / Station section of screen 
// ============================================================================
export default function SearchInput(){
	const navigate = useNavigate();
    const [alertMessage, setAlert] = useContext(AlertContext);

	// ====================================
	// Handles click on radio button
	// ====================================
	const handleRadioClick = (event) => {
		navigate("/order-food");
	}

	// ====================================
	// Handles click on Search button
	// ====================================
	const handleSearch = (event) => {
		event.preventDefault();   
		navigate("/order-food");
		setAlert({ alertMessage: "", alertType: "default" });
	}

	// *******************************************************************
    // *********          RETURN RESPOSNE                         ********
    // *******************************************************************
    return (
        <>
			<div id="order-bar">
				<br/>
				<span id="OrderNowText"><b>Order Now:&nbsp;&nbsp;&nbsp;</b></span>
				<input type="radio" id="radioTrain" name="search-options" value="Train" onClick={handleRadioClick}/>&nbsp;
				<label htmlFor="radioTrain">Train No</label>&nbsp;&nbsp;&nbsp;
				<input type="radio" id="radioStation" name="search-options" value="Station" onClick={handleRadioClick}/>&nbsp;
				<label htmlFor="radioStation">Station</label>
			</div>
			<div id="search-container">
				<form action="#">
					<input type="text" placeholder="Search.." name="search" id="searchBox" />
					<button type="submit" id="srchBtn" onClick={handleSearch}>Search</button>
				</form>
			</div>
		</>
    )
}

