import React from "react";
import { useContext, useEffect } from 'react';
import { AlertContext } from '../../Contexts/AlertContext.js';
import { Link, useNavigate} from "react-router-dom";
import './Alert.css';

//This is a common component that used across the screens, usually at the top
//It displays Alert message reading it from the global context
//Different components set this Alert passing a message and alert type
//Component support - default, warning, error and success as four alert types.
export default function Alert(){

	const navigate = useNavigate();

	const [alert, setAlert] = useContext(AlertContext);	
	const screenAlert = {
  		alertType: alert.alertType,
  		alertMessage: alert.alertMessage
	}
	var css = "a-" + screenAlert.alertType;
	
	const GoBack = () => {
		// useEffect(() => {navigate(-1)}, []);
		return; //Pending: Fix a issue around the back navigation.
	};

	// ****************** RETURN ********************
    return (
        <>
			<div className="col-sm-12 no-margin no-padding">
                <div className="col-sm-11 no-margin no-padding"> 
					<div id="default" className={css}>
						{screenAlert.alertMessage}
					</div>
                </div>
                <div className="col-sm-1">
                    <Link to={GoBack}> Back </Link>
                </div>
            </div>			
		</>
    )
}

