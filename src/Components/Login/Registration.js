import React from 'react'
import './Registration.css';
import {Link, useNavigate } from "react-router-dom";
import { AlertContext } from '../../Contexts/AlertContext.js';
import {useContext} from "react";
import Alert from "../Alert/Alert.js";

export default function Registration() {

    const [alertMessage, setAlert] = useContext(AlertContext);
    const navigate = useNavigate();

    //===================================================
    //Show and hide restuartant section 
    //===================================================
    const showHideRest = (event) => {
        if (document.getElementById("chkRestaurant").checked) { 
            document.getElementById("restaurant-details").style.display = "block";
        } else {
            document.getElementById("restaurant-details").style.display = "none";
        }
    }

    //===================================================
    //Password focus
    //===================================================
    const handlePasswordFocus = () => {
        setAlert({ alertMessage: "Password minimum 8 char and must have a Caps, Number and Symbol.", alertType: "default" });
        return;
    }

    //===================================================
    //Reset alert message
    //===================================================
    const handleCancel = () => {
        setAlert({ alertMessage: "", alertType: "default" });
        return;
    }
    
    //===================================================
    //Handle registration 
    //===================================================
    const handleRegistration = (event) => {
        var fld = "";
        setAlert({ alertMessage: "", alertType: "default" });
        
        //validate User Name
        fld = document.getElementById("regFormUserName").value;
        if (fld <= "") {
            setAlert({ alertMessage: "Enter user name", alertType: "error" });
            document.getElementById("regFormUserName").focus();
            return;     
        }

        //validate email id
        fld = document.getElementById("regFormEmail").value;
        if ((fld > "") && (fld.match("[@]") === null)) {
            setAlert({ alertMessage: "Invalid email id", alertType: "error" });
            document.getElementById("regFormEmail").focus();
            return;
        }

        //validate mobile number
        fld = document.getElementById("regFormMobile").value;
        if (fld.length !== 10){
            setAlert({ alertMessage: "Mobile number should be 10 characters and without country code", alertType: "error" });
            document.getElementById("regFormMobile").focus();
            return;     
        }

        if ((fld.length !== 10) || (fld.match("[A-Z]") !== null) || (fld.match("[%@#$]") !== null) || (fld.match("[a-z]") !== null)) {
            setAlert({ alertMessage: "Invalid mobile number", alertType: "error" });
            document.getElementById("regFormMobile").focus();
            return;    
        } 

        //Validate user id
        fld = document.getElementById("regFormUserid").value;
        if (fld === "") {            
            setAlert({ alertMessage: "User id is mandatory", alertType: "error" });
            document.getElementById("regFormUserid").focus();
            return;    
        } 

        //Validate user id
        fld = document.getElementById("regFormUserid").value;
        if ((fld.length < 4) || (fld.length > 15)) {            
            setAlert({ alertMessage: "User id should be more than 4 character and not exceeding 15 characters", alertType: "error" });
            document.getElementById("regFormUserid").focus();
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

        // if ((p1.match("[0-9]") === null) || (p1.match("[%@#$]") === null) || (p1.match("[A-Z]") === null)|| (p1.match("[a-z]") === null)) {
        //     setAlert({ alertMessage: "Password minimum 8 char and must have a Caps, Number and Symbol.", alertType: "error" });
        //     document.getElementById("regFormPassword1").focus();
        //     return;    
        // } 

        if (p1 !== p2) {            
            setAlert({ alertMessage: "Password do not match", alertType: "error" });
            document.getElementById("regFormPassword2").focus();
            return;    
        } 

        //Validate Restuarant field
        if (document.getElementById("chkRestaurant").checked === true) {

            //Restaurant name
            fld = document.getElementById("regFormRestName").value;
            if (fld === ""){
                setAlert({ alertMessage: "Restaurant name is mandatory", alertType: "error" });
                document.getElementById("regFormRestName").focus();
                return;  
            }

            //restaurant address
            fld = document.getElementById("regFormRestAddress").value;
            if (fld === ""){
                setAlert({ alertMessage: "Restuarant address is mandatory", alertType: "error" });
                document.getElementById("regFormRestAddress").focus();
                return;  
            }

            //restaurant address
            fld = document.getElementById("regFormRestLocation").value;
            if (fld === ""){
                setAlert({ alertMessage: "Restuarant location is mandatory", alertType: "error" });
                document.getElementById("regFormRestLocation").focus();
                return;  
            }

            //Ensure type of restuarant is selected
            if ((document.getElementById("radioVegRest").checked === false) && (document.getElementById("radioNonVegVegRest").checked === false)) {
                setAlert({ alertMessage: "Select restaurant type - Veg Non-Veg.", alertType: "error" });
                document.getElementById("radioVegRest").focus();
                return;
            }

        }

        //Check if terms accepted
        if (document.getElementById("chkTerms").checked === false) {
            setAlert({ alertMessage: "Please accept terms and conditions", alertType: "error" });
            document.getElementById("chkTerms").focus();
            return;
        } 

        // Obtain the screen details for creating User and Restaurant records
        var u_id        = document.getElementById("regFormUserid").value;
        var u_name      = document.getElementById("regFormUserName").value;
        var u_email     = document.getElementById("regFormEmail").value;
        var u_mobile    = document.getElementById("regFormMobile").value;
        var u_password  = document.getElementById("regFormPassword1").value;
        var u_role      = (document.getElementById("chkRestaurant").checked === true) ? "2" : "1";

        var r_id        = u_id;
        var r_owner     = u_id;
        var r_cname     = u_name;
        var r_cmobile   = u_mobile;
        var r_rating    = "";
        var r_status    = "1";
        var r_name      = "";
        var r_address   = "";
        var r_location  = "";
        var r_type      = "";

        if (document.getElementById("chkRestaurant").checked === true) {
            r_name      = document.getElementById("regFormRestName").value;
            r_address   = document.getElementById("regFormRestAddress").value;
            r_location  = document.getElementById("regFormRestLocation").value;
            r_type      = (document.getElementById("radioNonVegVegRest").checked === true) ? "1" : "0"
        }
        
        var payload = {
            user_id             : u_id,
            user_name           : u_name,
            user_email          : u_email,
            user_mobile         : u_mobile,
            user_password       : u_password,
            user_role           : u_role,
            rest_id             : r_id,
            rest_name           : r_name,
            rest_address        : r_address,
            rest_location_code  : r_location,
            rest_owner          : r_owner,
            contact_person      : r_cname,
            contact_no          : r_cmobile,
            rest_type           : r_type,
            rest_status         : "1",
            rest_rating         : r_status
        }

        var requestOptions = {
            method: 'POST',
            headers: {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json',
            },
            body: JSON.stringify(payload),
        }

        // ---------------------
        // Backend server call
        // ---------------------
        var baseURL     = "http://127.0.0.1:8000/fds/";
        var specificURL = "rest/api/users/registration/";
        var queryString = "";

        var url = baseURL + specificURL + queryString;        
                  
        fetch(url, requestOptions)
            .then(response => {
                    if(response.ok)  {
                        alert("Successfully registered.");
                        return response.json();     
                    } 
                    return response.json().then(response => {
                        throw new Error(response.error)
                    })
                }
            )
            .then(function(data) { 
                navigate('/login');
            })
            .catch(error => {
                console.log("Error Registering:" + error);
                alert ("Registration had issue, please try again");
            });
        // fetch ends here
    }

    //===================================================//
    //==              RETURN RESPONSE                  ==//
    //===================================================//
    return (
    <div>
        <Alert />
        <div className="reg-form-container" >            
            <br />
            <br />
            <div className="reg-form-components">
                <label htmlFor="regFormUserName" className="form-label" style={{color: 'blue'}}>Name*</label>
                <input type="text" className="form-control" id="regFormUserName" placeholder="Name"/>
            </div>
            
            <div className="reg-form-components">
                <label htmlFor="regFormUserid" className="form-label">Userid*</label>
                <input type="text" className="form-control" id="regFormUserid" placeholder="userid"/>
            </div>            
            <div className="reg-form-components">
                <label htmlFor="regFormEmail" className="form-label">Email</label>
                <input type="text" className="form-control" id="regFormEmail" placeholder="xyz@gmail.com"/>
            </div> 
            <div className="reg-form-components">
                <label htmlFor="regFormMobile" className="form-label">Mobile*</label>
                <input type="text" className="form-control" id="regFormMobile" placeholder="mobile number"/>
            </div> 
            
            <div className="reg-form-components">
                <label htmlFor="regFormPassword1" className="form-label">Password</label>
                <div>
                    <input type="password" className="form-control fld-password" id="regFormPassword1" placeholder="password" onClick={handlePasswordFocus}/>
                    <input type="text" className="form-control fld-password" id="regFormPassword2" placeholder="repeat"/>
                </div>
            </div> 
            <br/>
            <hr className="horizontal-line"/>
            <div className="reg-form-components">
				<input type="checkbox" id="chkRestaurant" name="role-type" value="Restaurant" onClick={showHideRest}/> &nbsp;
                <label htmlFor="chkRestaurant" >Are you registering as a restaurant owner?</label>			
			</div>          

            <div Id="restaurant-details" style={{display: "none"}}>
                <div className="reg-form-components">
                    <label htmlFor="regFormName" className="form-label" style={{color: 'blue'}}>Restaurant Name</label>
                    <input type="text" className="form-control" id="regFormRestName" placeholder="Name"/>
                </div>

                <div className="reg-form-components">
                    <input type="radio" id="radioVegRest" name="restaurant-type" value="Veg" defaultChecked/> &nbsp;
                    <label htmlFor="radioVegRest">Veg</label>	&nbsp;
                    <input type="radio" id="radioNonVegVegRest" name="restaurant-type" value="Non-Veg"/> &nbsp;
                    <label htmlFor="radioNonVegVegRest">Non-Veg</label>	&nbsp;		
			    </div> 
                
                <div className="reg-form-components">
                    <label htmlFor="regFormName" className="form-label">Restaurant Address</label>
                    <input type="text" className="form-control" id="regFormRestAddress" placeholder="Name"/>
                </div>   

                <div className="reg-form-components">
                    <label htmlFor="regFormName" className="form-label">Location Code (station code)</label>
                    <input type="text" className="form-control" id="regFormRestLocation" placeholder="NDLS"/>
                </div>              

                <br/>
            </div>
            <hr className="horizontal-line"/>
            <div className="reg-form-components"> 
                    <input type="checkbox" id="chkTerms" name="terms-and-conditions" value="TC"/> &nbsp;
                    <label htmlFor="chkTerms">I accept all terms and conditions.*</label>&nbsp;
            </div>

            <div className="reg-form-components">
                <Link to="#" className="btn btn-primary" role="button" onClick={handleRegistration}>Register</Link>
                &nbsp;&nbsp;
                <Link to="/login" className="btn btn-danger" role="button" onClick={handleCancel}>Cancel</Link>
            </div>
            
        </div>
    </div>
  )
}
