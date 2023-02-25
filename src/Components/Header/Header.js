import React from "react";
import HomeIcon from './images/Home icon.png';
import ImgTrainLogo from './images/FDS Train Logo.jpg';
import ImgFDS from './images/FDS.JPG';
import ImgDeliverySteps from './images/Delivery Steps.jpg';
import './Header.css';
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { UserContext, defaultUser } from '../../Contexts/UserContext.js';
import { AlertContext } from '../../Contexts/AlertContext.js';

export default function Header(){
	const [userContext, setUserContext] = useContext(UserContext);	

	// Obtain alert context and define a local alert object    
	const [alertMessage, setAlert] = useContext(AlertContext);
	const a = {alertType: "default", alertMessage: ""}
	
	// Handles logout
	const handleLogout = (event) => {
		
		setUserContext(defaultUser);
		
		a.alertMessage = ""
		a.alertType = "default";
		setAlert(a);
	}

	//***************** RETURN *****************
    return (
        <div className="header-container">
			<div id="HTR" className="header-columns">
				
				<div id="HTR-L" className="header-row1-col1"><Link to="/"><img id="home-ico" src = {HomeIcon} alt="Home"/></Link></div>
				<div id="HTR-M" className="header-row1-col2"></div>
				<div id="HTR-R" className="header-row1-col3">
					<span id="Welcome">Welcome: {userContext.name + " (" + userContext.role + ")"} </span>					
					{userContext.isLoggedIn ? (
						<span id="Logout"><Link to="/login" onClick={handleLogout}>Logout</Link></span>
					) : (
						<span id="Login"><Link to="/login">Login</Link>&nbsp;/&nbsp;<Link to="/register">Register</Link></span>
      				)}
				</div>
			</div>

			<div id="HMR" className="header-columns">
				<div id="HMR-L" className="header-column1"><img src = {ImgTrainLogo} alt="FDS Train Image" style={{width:'100%'}}/></div>
				<div id="HMR-M" className="header-column2"><img id="FDSImg"src = {ImgFDS} alt="Food Delivery Service" style={{width:'100%'}}/></div>
				<div id="HMR-R" className="header-column3"><img src = {ImgDeliverySteps} alt="Delivery Steps" style={{width:'100%'}}/></div>
			</div>

			<div className="header-columns">				
				<nav aria-label="breadcrumb" className="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item"><Link to="/">Home</Link></li>
						<li className="breadcrumb-item active" aria-current="page">.</li>
					</ol>
				</nav>			
			</div>
		</div>
    )
}