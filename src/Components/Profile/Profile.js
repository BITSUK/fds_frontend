import React from 'react'
import './Profile.css';
import {Link} from "react-router-dom";
import { AlertContext } from '../../Contexts/AlertContext.js';
import {UserContext} from '../../Contexts/UserContext.js';
import {useContext} from "react";
import Alert from "../Alert/Alert.js";

export default function Profile() {

    const [userContext, setUserContext] = useContext(UserContext);
    const [alertMessage, setAlert] = useContext(AlertContext);

    //===============================================
    // Handle Profile Update
    //===============================================
    const handleProfileUpdate = (event) => {
        var fld = "";
        setAlert({ alertMessage: "", alertType: "default" });

        // Validate User Name
        fld = document.getElementById("regFormUserName").value;
        if (fld <= "") {
            setAlert({ alertMessage: "Enter user name", alertType: "error" });
            document.getElementById("regFormUserName").focus();
            return;     
        }
        var uname = fld;

        // Validate mobile number
        fld = document.getElementById("regFormMobile").value;
        if (fld.length !== 10){
            setAlert({ alertMessage: "Mobile number should be 10 characters and without country code", alertType: "error" });
            document.getElementById("regFormMobile").focus();
            return;     
        }

        if ((fld.length !== 10) || (fld.match("[A-Z]") !== null) || (fld.match("[%@#$]") !== null) || (fld.match("[a-z]") != null)) {
            setAlert({ alertMessage: "Invalid mobile number", alertType: "error" });
            document.getElementById("regFormMobile").focus();
            return;    
        } 

        var umobile = fld;

        // Validate email id
        fld = document.getElementById("regFormEmail").value;
        if ((fld > "") && (fld.match("[@]") == null)) {
            setAlert({ alertMessage: "Invalid email id", alertType: "error" });
            document.getElementById("regFormEmail").focus();
            return;
        }

        var uemail = fld;
        
        // --------------------------------------------------
        // Backend server call - to get user details
        // --------------------------------------------------
        var baseURL     = "http://127.0.0.1:8000/fds/";
        var specificURL = "rest/api/users/" + userContext.id ;
        var queryString = "";

        var url = baseURL + specificURL + queryString; 

        fetch(url)
        .then(response => {
                if(response.status === 200)  {
                    return response.json();     
                } 
                return response.json().then(response => {
                    throw new Error(response.error)
                })
            }
        )
        .then(function(data) {

            // --------------------
            // Update user details
            // --------------------
            var payload = {
                "user_id": userContext.uid,
                "user_name": uname,
                "user_email": uemail,
                "user_mobile": umobile,
                "user_password": data.user_password,
                "user_role": (userContext.role === "customer")? "1" : "2"
            }

            var requestOptions = {
                method: 'PUT',
                headers: {
                    'Accept'        : 'application/json',
                    'Content-Type'  : 'application/json',
                },
                body: JSON.stringify(payload),
            }
            
            fetch(url, requestOptions)
            .then(response => {
                    if(response.status === 200)  {
                        alert("Details updated successfully.");
                        return response.json();     
                    } 
                    return response.json().then(response => {
                        throw new Error(response.error)
                    })
                }
            )
            .then(function(data) {
                return;
            })
            .catch(error => {
                console.log("Error Updating:" + error);
                alert ("Update unsuccessful, please try after some time.");
                return;
            });
            return;
        })
        .catch(error => {
            console.log("Error Fetching:" + error);
            alert ("System faced some issue, please try after some time.");
            return;
        });

    }

    //===============================================
    // Handle change password
    //===============================================
    const handleChangePassword = (event) => {
        alert("Change password feature is not enabled currently, use forgot password from the login screen.")
    }

    // *******************************************************************
    // *********          RETURN RESPOSNE                         ********
    // *******************************************************************
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
                <label>Profile Type: {userContext.role}</label> <br/>
                {/* <input type="radio" id="radioCustomer" name="user-type" value="1" defaultChecked/>&nbsp;
                <label htmlFor="chkVegRest">Customer</label>	&nbsp;
                <input type="radio" id="radioRestaurant" name="user-type" value="2"/>&nbsp;
                <label htmlFor="chkNonVegRest">Restaurant</label>	&nbsp;		 */}
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
