import React from 'react'
import './ResetPassword.css';
import {Link} from "react-router-dom";
import { AlertContext } from '../../Contexts/AlertContext.js';
import {useContext} from "react";
import Alert from "../Alert/Alert.js";

export default function ResetPassword() {

    // Obtain alert context and define a local alert object
    const [alertMessage, setAlert] = useContext(AlertContext);
    const a = {
        alertType: alertMessage.alertType,
        alertMessage: alertMessage.alertMessage
    } 
    
    const handleResetPassword = (event) => {
        var fld = "";
        setAlert({ alertMessage: "", alertType: "default" });

        //validate otp
        fld = document.getElementById("resetFormOTP").value;
        if (fld.length != 4){
            setAlert({ alertMessage: "Invalid OTP, should be 4 digit", alertType: "error" });
            document.getElementById("resetFormOTP").focus();
            return;     
        }

        if ((fld.length != 4) || (fld.match("[A-Z]") != null) || (fld.match("[%@#$]") != null) || (fld.match("[a-z]") != null)) {
            setAlert({ alertMessage: "Invalid OTP, should be 4 digit", alertType: "error" });
            document.getElementById("resetFormOTP").focus();
            return;    
        } 

        //Validate password
        var p1 = document.getElementById("regFormPassword1").value;
        var p2 = document.getElementById("regFormPassword2").value;

        if ((p1 === "") || (p1.length < 8)) {
            setAlert({ alertMessage: "Password should be minimum 8 characters", alertType: "error" });
            document.getElementById("regFormPassword1").focus();
            return;    
        } 

        if ((p1.match("[0-9]") === null) || (p1.match("[%@#$]") === null) || (p1.match("[A-Z]") === null)|| (p1.match("[a-z]") === null)) {
            setAlert({ alertMessage: "Password minimum 8 char and must have a Caps, Number and Symbol.", alertType: "error" });
            document.getElementById("regFormPassword1").focus();
            return;    
        } 

        if (p1 !== p2) {            
            setAlert({ alertMessage: "Password do not match", alertType: "error" });
            document.getElementById("regFormPassword2").focus();
            return;    
        } 

        setAlert({ alertMessage: "Password reset successfully.", alertType: "success" });

        return;       
    }

    const handleVerifyOTP = (event) => {

        var fld = "";
        setAlert({ alertMessage: "", alertType: "default" });

        //Validate user id
        fld = document.getElementById("regFormUserid").value;
        if ((fld === "") || (fld.length <=    4)) {            
            setAlert({ alertMessage: "User id should be more than 4 characters", alertType: "error" });
            document.getElementById("regFormUserid").focus();
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

        setAlert({ alertMessage: "OTP generated.", alertType: "success" });

        return;
    }
    
    return (
        
    <div>
        <Alert />
        <div className="reset-form-container">            
            <div className="reset-form-components">
                <label htmlFor="resetFormUserid" className="form-label">User</label>
                <input type="text" className="form-control" id="regFormUserid" placeholder="userid"/>
            </div>           
            <div className="reset-form-components">
                <label htmlFor="resetFormMobile" className="form-label">Mobile</label>
                <input type="text" className="form-control" id="regFormMobile" placeholder="mobile number"/>
            </div>
            <div className="reset-form-components">
                <Link to="#" className="btn btn-primary" role="button" onClick={handleVerifyOTP}>Send OTP</Link>
            </div>
                         
            <fieldset>
                <div className="reset-form-components">
                    {/* <div className="reset-form-components"> */}
                    <label htmlFor="resetFormOTP" className="form-label fld-password ">OTP</label>
                    <input type="text" className="form-control fld-password " id="resetFormOTP" placeholder="OTP"/>
                {/* </div>  */}
                    <label htmlFor="resetFormPassword1" className="form-label">Password</label>
                    <div>
                        <input type="text" className="form-control fld-password" id="regFormPassword1" placeholder="password"/>
                        <input type="password" className="form-control fld-password" id="regFormPassword2" placeholder="repeat"/>
                    </div>
                </div>            
            </fieldset> 
            <div className="reset-form-components" id="passwordFields">
                <Link to="#" className="btn btn-primary" role="button" onClick={handleResetPassword}>Submit</Link>
                &nbsp;&nbsp;
                <Link to="/login" className="btn btn-danger" role="button">Cancel</Link>
            </div>

        </div>
    </div>
  )
}
