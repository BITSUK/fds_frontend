import React from 'react'
import './RestDetails.css';
import {Link} from "react-router-dom";
import { AlertContext } from '../../Contexts/AlertContext.js';
import {useContext} from "react";
import Alert from "../Alert/Alert.js";

export default function RestDetails() {

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

        //restaurant address
        fld = document.getElementById("regFormRestAddress").value;
        if (fld === ""){
            setAlert({ alertMessage: "Restuarant address is mandatory", alertType: "error" });
            document.getElementById("regFormRestAddress").focus();
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
                <label htmlFor="regFormName" className="form-label">Restaurant Name</label>
                <input type="text" className="form-control" id="regFormRestName" placeholder="Name" value="Shree Sai Bhojanle"/>
            </div>
            <br />
            
            <div className="reg-form-components">
                <label htmlFor="regFormName" className="form-label">Restaurant Address</label>
                <input type="text" className="form-control" id="regFormRestAddress" placeholder="Name" value="Delhi"/>
            </div>
            <br />

            <div className="reg-form-components">
                <label>Restaurant Type: </label> <br/>
                <input type="checkbox" id="chkVegRest" name="restaurant-type" value="Veg" defaultChecked/> &nbsp;
                <label htmlFor="chkVegRest">Veg</label>	&nbsp;
                <input type="checkbox" id="chkNonVegRest" name="restaurant-type" value="Non-Veg"/> &nbsp;
                <label htmlFor="chkNonVegRest">Non-Veg</label>	&nbsp;		
            </div>  
            <br />

            <div className="reg-form-components"> 
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
            </div>

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
