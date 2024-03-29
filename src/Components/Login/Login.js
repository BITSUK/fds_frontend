import React from 'react';
import './Login.css';
import {Link, useNavigate } from "react-router-dom";
import {useContext} from "react";
import { UserContext } from '../../Contexts/UserContext.js';
import { AlertContext } from '../../Contexts/AlertContext.js';
import { CartContext, emptyCart} from '../../Contexts/CartContext.js';
import Alert from "../Alert/Alert.js";

export default function Login(props) {
    
    const [userContext, setUserContext] = useContext(UserContext);	
    const [cart, setCart] = useContext(CartContext);
    const [alertMessage, setAlert] = useContext(AlertContext);
    const a = { alertType: "default", alertMessage: "" }     
    
    const navigate = useNavigate();

    //===========================================================
    // Handle Login 
    //===========================================================
    const handleLogin = (event) => {

        event.preventDefault();               

        // Obtain entered userid and password
        var inputUserId = document.getElementById("loginFormUserId").value;        
        var inputPassword = document.getElementById("loginFormPassword").value;
        var inputRole = document.getElementById("radioCustomer").checked === true ? "1" : "2";
        
        //Validate the user id and password
        if (inputUserId === "" || inputPassword === "") {
            a.alertMessage = "Userid or password not entered";
            a.alertType = "error";
            setAlert(a);

        } else if ((inputUserId.length > 4) &&  (inputPassword.length >= 8)) {    
            
            //Call Backend Login API
            //Pending, convert this GET into a PUT call, or encrypt/encode the password
            var loginURL = "http://127.0.0.1:8000/fds/rest/api/users/login/" 
            var queryString = "?" + "user_id=" + inputUserId + "&user_password=" + inputPassword + "&user_role=" + inputRole
                      
            loginURL += queryString

            fetch(loginURL)
                .then(response => response.json())      // convert response to json
                .then(function(data) {                  // process response
                    console.log('API Response: ');
                    console.log(data);                

                    var role = (data[0].user_role === "1") ? "customer" : "restaurant";
                        
                    if (data[0].user_id === inputUserId) {
                        setUserContext({
                            id: data[0].id,
                            uid: data[0].user_id,
                            name: data[0].user_name,
                            mobile: data[0].user_mobile,
                            email: data[0].user_email,
                            address: "",
                            role: role,
                            isLoggedIn: true,
                            train: "",
                            trainName : "",
                            station: "",
                            stationName: "",
                            rest: data[0].user_id,
                            restName: "",
                            jdate: ""
                        })
                        
                        a.alertMessage = "";
                        a.alertType = "default";
                        setAlert(a);                    
                        
                        alert("Login Successful");
                        setCart(emptyCart);
                        navigate('/dashboard');
                    } else {
                        a.alertMessage = "Userid or password not valid, please try again.";
                        a.alertType = "error";
                        setAlert(a); 
                    }
                
                })
                .catch(error => {
                    console.log ("Error calling /login endpoint: " + error);
                    alert("Login failed check credentials and try again.");
                });
            // fetch logic ends

        } else {
            a.alertMessage = "Userid or password not valid, try again.";
            a.alertType = "error";
            setAlert(a);
        }
    }    

    //===================================================//
    //==              RETURN RESPONSE                  ==//                      
    //===================================================//
    return (
    <div className="no-margin">
        <Alert />
        <div data-testid='login-test-id' className="login-form-container">   
            <br/>
            .    
            <div className="login-form-components">
				<input type="radio" id="radioCustomer" name="role-type" value="customer" defaultChecked/> &nbsp;
                <label htmlFor="radioCustomer">Customer</label>	&nbsp;
				<input type="radio" id="radioRestaurant" name="role-type" value="restaurant"/> &nbsp;
                <label htmlFor="radioRestaurant">Restaurant</label>			
			</div>                 
            <div className="login-form-components">
                <label htmlFor="loginFormUserId" className="form-label">User Id</label>
                <input type="text" className="form-control" id="loginFormUserId" placeholder="userid"/>
            </div>
            <div className="login-form-components">
                <label htmlFor="loginFormPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginFormPassword" placeholder="password"/>
            </div>
            
            <div className="login-form-components">
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                &nbsp;&nbsp;                
                <Link to="/forgot-password" className="btn btn-info" role="button">Forgot Password</Link>
            </div>
            <br />
            <div>Click <Link to="/register"><b>here</b></Link> to register.</div>
            <br />
            <br />
            <br />
            <br />
        </div>
    </div>
  )

 
}
