import React, { useState, useEffect } from 'react'
import './RestDetails.css';
import {Link} from "react-router-dom";
import { AlertContext } from '../../Contexts/AlertContext.js';
import {UserContext} from '../../Contexts/UserContext.js';
import {useContext} from "react";
import Alert from "../Alert/Alert.js";

export default function RestDetails() {
    const [userContext, setUserContext] = useContext(UserContext);
    const [restaurantsdata, setRestaurantsdata] = useState([{
        "rest_id": "",
        "rest_name": "",
        "rest_address": "",
        "rest_location_code": "",
        "rest_owner": "",
        "contact_person": "",
        "contact_no": "",
        "rest_type": "",
        "rest_status": "",
        "rest_rating": 0
    }]);

    //fetch trains
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch('http://127.0.0.1:8000/fds/rest/api/restaurants/'+ "?rest_id=" + userContext.rest);
        const data = await response.json();
        // console.log(data.results);
        setRestaurantsdata(data.results);
        };

        fetchData();
    }, []);

    if (restaurantsdata.rest_type === "1") {
        document.getElementById("chkNonVegRest").checked = true;
    }
    const [alertMessage, setAlert] = useContext(AlertContext);
    const a = { alertType: alertMessage.alertType, alertMessage: alertMessage.alertMessage }  
    
    // ------------------
    // Handle Update 
    // ------------------
    const handleRestUpdate = (event) => {
        var fld = "";
        setAlert({ alertMessage: "", alertType: "default" });

        //Restaurant name
        fld = document.getElementById("regFormRestName").value;
        if (fld === ""){
            setAlert({ alertMessage: "Restaurant name is mandatory", alertType: "error" });
            document.getElementById("regFormRestName").focus();
            return;  
        }

        //Restaurant address
        fld = document.getElementById("regFormRestAddress").value;
        if (fld === ""){
            setAlert({ alertMessage: "Restuarant address is mandatory", alertType: "error" });
            document.getElementById("regFormRestAddress").focus();
            return;  
        }

        //Restaurant location
        fld = document.getElementById("regFormRestLocation").value;
        if (fld === ""){
            setAlert({ alertMessage: "Restuarant location is mandatory", alertType: "error" });
            document.getElementById("regFormRestLocation").focus();
            return;  
        }

        var r_name = document.getElementById("regFormRestName").value;
        var r_address = document.getElementById("regFormRestAddress").value;
        var r_location = document.getElementById("regFormRestLocation").value;
        var r_type = (document.getElementById("chkNonVegRest").checked === true) ? "1" : "0"

        var payload = {
            "rest_id": restaurantsdata[0].rest_id,
            "rest_name": r_name,
            "rest_address": r_address,
            "rest_location_code": r_location,
            "rest_owner": restaurantsdata[0].rest_owner,
            "contact_person": restaurantsdata[0].contact_person,
            "contact_no": restaurantsdata[0].contact_no,
            "rest_type": r_type,
            "rest_rating": restaurantsdata[0].rest_rating,
            "rest_status": restaurantsdata[0].rest_status
        }

        var requestOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }

        //-----------------------
        // Backend server call
        //-----------------------
        var baseURL = "http://127.0.0.1:8000/fds/";
        var specificURL = "rest/api/restaurants/" + restaurantsdata[0].id;
        var queryString = "";

        var url = baseURL + specificURL + queryString;        
                  
        fetch(url, requestOptions)
            .then(response => {
                    if(response.ok)  {
                        alert("Successfully updated.");
                        return response.json();     // convert response to json
                    } 
                    return response.json().then(response => {
                        throw new Error(response.error)
                    })
                }
            )
            .then(function(data) {                 
                //console.log(data);                
            })
            .catch(error => {
                console.log("Error upgating rest:" + error);
                alert ("Some error happened, please try again");
            });
        // fetch ends

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
                <label htmlFor="regFormName" className="form-label">Restaurant Name</label>
                <input type="text" className="form-control" id="regFormRestName" placeholder="Name" defaultValue={restaurantsdata[0].rest_name}/>
            </div>
            <br />
            
            <div className="reg-form-components">
                <label htmlFor="regFormName" className="form-label">Restaurant Address</label>
                <input type="text" className="form-control" id="regFormRestAddress" placeholder="Name" defaultValue={restaurantsdata[0].rest_address} />
            </div>
            <br />

            <div className="reg-form-components">
                <label htmlFor="regFormName" className="form-label">Location code (station)</label>
                <input type="text" className="form-control" id="regFormRestLocation" placeholder="NDLS" defaultValue={restaurantsdata[0].rest_location_code}/>
            </div>
            <br />

            <div className="reg-form-components">
                <label>Restaurant Type: </label> <br/>
                <input type="radio" id="chkVegRest" name="restaurant-type" value="Veg" defaultChecked/>&nbsp;
                <label htmlFor="chkVegRest">Veg</label>	&nbsp;
                <input type="radio" id="chkNonVegRest" name="restaurant-type" value="Non-Veg"/>&nbsp;
                <label htmlFor="chkNonVegRest">Non-Veg</label>	&nbsp;		
            </div>  
            <br />

            {/* <div className="reg-form-components"> 
                <label>Operational Days: </label><br/>
                <input type="checkbox" id="chkMon" name="restaurant-type" value="Mon" defaultChecked/> &nbsp;
                <label htmlFor="chkMon">Mon</label>&nbsp;
                <input type="checkbox" id="chkTue" name="restaurant-type" value="Tue" defaultChecked/> &nbsp;
                <label htmlFor="chkTue">Tue</label>&nbsp;
                <input type="checkbox" id="chkWed" name="restaurant-type" value="Wed" defaultChecked/> &nbsp;
                <label htmlFor="chkWed">Wed</label>&nbsp;
                <input type="checkbox" id="chkThu" name="restaurant-type" value="Thu" defaultChecked/> &nbsp;
                <label htmlFor="chkThu">Thu</label>&nbsp;
                <input type="checkbox" id="chkFri" name="restaurant-type" value="Fri" defaultChecked/> &nbsp;
                <label htmlFor="chkFri">Fri</label>&nbsp;
                <input type="checkbox" id="chkSat" name="restaurant-type" value="Sat" defaultChecked/> &nbsp;
                <label htmlFor="chkSat">Sat</label>&nbsp;
                <input type="checkbox" id="chkSun" name="restaurant-type" value="Sun" defaultChecked/> &nbsp;
                <label htmlFor="chkSun">Sun</label>&nbsp;
            </div> */}

            <br />
            <div className="reg-form-components">
                <Link to="#" className="btn btn-primary" role="button" onClick={handleRestUpdate}>Update</Link>
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
