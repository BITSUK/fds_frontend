import React from "react";
import "./NoPage.css";
import {useNavigate } from "react-router-dom";

export default function UnderConstruction(props){

    const navigate = useNavigate();

    //For now it returns user to the dashboard
    const handleGoBack = (event) => {
        navigate('/dashboard'); 
        return;
    }

    return (
        <div className="nopage-container">
			<div>
            <p>
            This page is under construction.
            </p>
            {/* <button className="btn btn-info" onClick={handleGoBack}>Go Back</button> */}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
		</div>
    )
}