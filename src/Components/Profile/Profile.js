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

    // document.getElementById("regFormUserName").value = userContext.name;
    // document.getElementById("regFormMobile").value = userContext.mobile;
    // document.getElementById("regFormEmail").value = userContext.email;
    if (userContext.role === "restautant") document.getElementById("radioRestaurant").checked = true;

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

        // setAlert({ alertMessage: "Details updated.", alertType: "success" });
        alert("Details updated");
        
    }

    //Handle registration 
    const handleChangePassword = (event) => {
        alert("Change password feature is not enabled currently, working on it...")
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
                <input type="text" className="form-control" id="regFormUserName" placeholder="Name" defaultValue={userContext.name}/>
            </div>
            <br />
            
            <div className="reg-form-components">
                <label htmlFor="regFormMobile" className="form-label">Mobile*</label>
                <input type="text" className="form-control" id="regFormMobile" placeholder="mobile number" defaultValue = {userContext.mobile}/>
            </div>
            <br />

            <div className="reg-form-components">
                <label htmlFor="regFormEmail" className="form-label">Email</label>
                <input type="text" className="form-control" id="regFormEmail" placeholder="xyz@gmail.com" defaultValue = {userContext.email}/>
            </div> 
            <br /> 

            <div className="reg-form-components">
                <label>Profile Type: </label> <br/>
                <input type="radio" id="radioCustomer" name="user-type" value="1" defaultChecked/>&nbsp;
                <label htmlFor="chkVegRest">Customer</label>	&nbsp;
                <input type="radio" id="radioRestaurant" name="user-type" value="2"/>&nbsp;
                <label htmlFor="chkNonVegRest">Restaurant</label>	&nbsp;		
            </div>
            <br />

            <br />
            <div className="reg-form-components">
                <Link to="#" className="btn btn-primary" role="button" onClick={handleProfileUpdate}>Update</Link>
                &nbsp;&nbsp;                
                <Link to="#" className="btn btn-info" role="button" onClick={handleChangePassword}>Change Password</Link>
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
