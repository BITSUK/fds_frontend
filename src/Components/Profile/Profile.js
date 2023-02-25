import React from 'react'
import './Profile.css';
import {Link} from "react-router-dom";
import { AlertContext } from '../../Contexts/AlertContext.js';
import {UserContext} from '../../Contexts/UserContext.js';
import {useContext} from "react";
import Alert from "../Alert/Alert.js";

export default function Profile() {

    const [userContext, setUserContext] = useContext(UserContext);

    // Obtain alert context and define a local alert object
    const [alertMessage, setAlert] = useContext(AlertContext);
    const a = {
        alertType: alertMessage.alertType,
        alertMessage: alertMessage.alertMessage
    }     

    //Reset alert message
    const handleCancel = () => {
        setAlert({ alertMessage: "", alertType: "default" });
        return;
    }
    
    //Handle registration 
    const handleProfileUpdate = (event) => {
        var fld = "";
        setAlert({ alertMessage: "", alertType: "default" });

        //validate User Name
        fld = document.getElementById("regFormUserName").value;
        if (fld <= "") {
            setAlert({ alertMessage: "Enter user name", alertType: "error" });
            document.getElementById("regFormUserName").focus();
            return;     
        }

        //validate mobile number
        fld = document.getElementById("regFormMobile").value;
        if (fld.length != 10){
            setAlert({ alertMessage: "Mobile number should be 10 characters and without country code", alertType: "error" });
            document.getElementById("regFormMobile").focus();
            return;     
        }

        if ((fld.length != 10) || (fld.match("[A-Z]") != null) || (fld.match("[%@#$]") != null) || (fld.match("[a-z]") != null)) {
            setAlert({ alertMessage: "Invalid mobile number", alertType: "error" });
            document.getElementById("regFormMobile").focus();
            return;    
        } 
        

        //validate email id
        fld = document.getElementById("regFormEmail").value;
        if ((fld > "") && (fld.match("[@]") == null)) {
            setAlert({ alertMessage: "Invalid email id", alertType: "error" });
            document.getElementById("regFormEmail").focus();
            return;
        }

        //User address 
        fld = document.getElementById("regFormUserAddress").value;
        if (fld === ""){
            setAlert({ alertMessage: "User address is mandatory", alertType: "error" });
            document.getElementById("regFormUserAddress").focus();
            return;  
        }

        // setAlert({ alertMessage: "Details updated.", alertType: "success" });
        alert("Details updated");
        
    }

    
    //************* RETURN **************************
    return (
    <div>
        <Alert />
        <div className="reg-form-container">            
            <br />
            <br />
            <div className="reg-form-components">
                <label htmlFor="regFormUserName" className="form-label" >Name*</label>
                <input type="text" className="form-control" id="regFormUserName" placeholder="Name" value={userContext.name}/>
            </div>
            <br />
            
            <div className="reg-form-components">
                <label htmlFor="regFormMobile" className="form-label">Mobile*</label>
                <input type="text" className="form-control" id="regFormMobile" placeholder="mobile number" value={userContext.mobile}/>
            </div>
            <br />

            <div className="reg-form-components">
                <label htmlFor="regFormEmail" className="form-label">Email</label>
                <input type="text" className="form-control" id="regFormEmail" placeholder="xyz@gmail.com" value={userContext.email}/>
            </div> 
            <br /> 

            <div className="reg-form-components">
                <label htmlFor="regFormAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="regFormUserAddress" placeholder="Address" value={userContext.address}/>
            </div>
            <br />

            <br />
            <div className="reg-form-components">
                <Link to="#" className="btn btn-primary" role="button" onClick={handleProfileUpdate}>Update</Link>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            
        </div>
    </div>
  )
}
