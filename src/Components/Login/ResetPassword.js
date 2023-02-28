import React from 'react'
import './ResetPassword.css';
import {Link, useNavigate} from "react-router-dom";
import { AlertContext } from '../../Contexts/AlertContext.js';
import {useContext, useState} from "react";
import Alert from "../Alert/Alert.js";

export default function ResetPassword() {

    const navigate = useNavigate();
    
    const [alertMessage, setAlert] = useContext(AlertContext);
    const [otpStatus, setOTPStatus] = useState("n");
    var uid = "";
    var mobile = "";   
    var new_password = "";  

    
    //==========================================================
    // Handle Verify OTP
    //==========================================================
    const handleVerifyOTP = (event) => {

        var fld = "";
        setAlert({ alertMessage: "", alertType: "default" });
        setOTPStatus("n");

        //Validate user id
        fld = document.getElementById("regFormUserid").value;
        if ((fld === "") || (fld.length <=    4)) {            
            setAlert({ alertMessage: "User id should be more than 4 characters", alertType: "error" });
            document.getElementById("regFormUserid").focus();
            return;    
        }
        uid = fld;

        //validate mobile number
        fld = document.getElementById("regFormMobile").value;
        if (fld.length !==10){
            setAlert({ alertMessage: "Mobile number should be 10 characters and without country code", alertType: "error" });
            document.getElementById("regFormMobile").focus();
            return;     
        }
        
        if ((fld.length !==10) || (fld.match("[A-Z]") !==null) || (fld.match("[%@#$]") !==null) || (fld.match("[a-z]") !==null)) {
            setAlert({ alertMessage: "Invalid mobile number", alertType: "error" });
            document.getElementById("regFormMobile").focus();
            return;    
        } 
        mobile = fld;

        var url = 'http://127.0.0.1:8000/fds/rest/api/users/?user_id=' + uid;
        fetch(url)
            .then(response => {
                    if(response.ok)  {
                        // setOTPStatus("y");
                        return response.json();     
                    } 
                    alert ("User Id or mobile not valid, try again.");
                    return response.json() 
                }
            )
            .then(function(data) { 
                console.log(data); 
                if (data.count > 0) {
                    if (data.results[0].user_mobile ===  mobile) {
                        setOTPStatus("y");
                        alert("OTP generated.");
                        document.getElementById("passwordRestSection").style.display = "block";
                        document.getElementById("regFormUserid").disabled =  true;
                        document.getElementById("regFormMobile").disabled =  true;
                        document.getElementById("resetFormOTP").focus();
                    }
                }
                else{
                    alert ("User Id or mobile not valid, try again."); 
                }
            })
            .catch(error => {
                console.log("Error in resetting password:" + error);
                alert ("User Id or mobile not valid, try again.");
            });

        return;
    }

    //==========================================================
    // Handle Reset Password
    //==========================================================
    const handleResetPassword = (event) => {
        var fld = "";
        setAlert({ alertMessage: "", alertType: "default" });

        //Validate OTP
        fld = document.getElementById("resetFormOTP").value;
        if (fld.length !== 4){
            setAlert({ alertMessage: "Invalid OTP, should be 4 digits.", alertType: "error" });
            document.getElementById("resetFormOTP").focus();
            return;     
        }

        if (isNaN(fld)) {
            setAlert({ alertMessage: "Invalid OTP, should be 4 digits.", alertType: "error" });
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

        uid = document.getElementById("regFormUserid").value;
        new_password = p1;

        // Backend server call
        var payload = {
                user_id             : uid,
                user_new_password   : new_password,
        }

        var requestOptions = {
            method: 'PUT',
            headers: {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json',
            },
            body: JSON.stringify(payload),
        }

        var baseURL     = "http://127.0.0.1:8000/fds/";
        var specificURL = "rest/api/users/change_password/";
        var queryString = "";

        var url = baseURL + specificURL + queryString;        
                  
        fetch(url, requestOptions)
            .then(response => {
                    if(response.status === 200)  {
                        return response.json();     
                    } 
                    // else some error has happened
                    return response.json().then(response => {
                        throw new Error(response.error)
                    })
                }
            )
            .then(function(data) {
                alert("Password changed successfully.");
                document.getElementById("regFormUserid").disabled =  false;
                document.getElementById("regFormMobile").disabled =  false;
                document.getElementById("regFormUserid").value =  "";
                document.getElementById("regFormMobile").value = "";
                document.getElementById("resetFormOTP").value = "";
                document.getElementById("regFormPassword1").value = "";
                document.getElementById("regFormPassword2").value = "";                
                document.getElementById("passwordRestSection").style.display = "none"; 
                navigate('/login');
                return;
            })
            .catch(error => {
                console.log("Error Registering:" + error);
                document.getElementById("regFormUserid").disabled =  false;
                document.getElementById("regFormMobile").disabled =  false;
                document.getElementById("regFormUserid").value =  "";
                document.getElementById("regFormMobile").value = "";
                document.getElementById("resetFormOTP").value = "";
                document.getElementById("regFormPassword1").value = "";
                document.getElementById("regFormPassword2").value = "";                
                document.getElementById("passwordRestSection").style.display = "none"; 
                alert ("Registration had issue, please try again");
                return;
            });
        // fetch ends here

    }
    
    //===================================================//
    //==              RETURN RESPONSE                  ==//
    //===================================================//    
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
                         
            <fieldset id="passwordRestSection" style={{display:"none"}}>
                <div className="reset-form-components">
                    <label htmlFor="resetFormOTP" className="form-label fld-password ">OTP</label>
                    <input type="text" className="form-control fld-password " id="resetFormOTP" placeholder="OTP"/>
                    <label htmlFor="resetFormPassword1" className="form-label">Password</label>
                        <div>
                            <input type="password" className="form-control fld-password" id="regFormPassword1" placeholder="password"/>
                            <input type="text" className="form-control fld-password" id="regFormPassword2" placeholder="repeat"/>
                        </div>
                </div>            
                <div className="reset-form-components" id="passwordFields">
                    <Link to="#" className="btn btn-primary" role="button" onClick={handleResetPassword}>Submit</Link>&nbsp;&nbsp;
                    <Link to="/login" className="btn btn-danger" role="button">Cancel</Link>
                </div>
            </fieldset> 
            <br/>
            <br/>
        </div>
    </div>
  )
}
