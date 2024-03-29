import React from 'react'
import './AddMenuItem.css';
import {Link, useNavigate} from "react-router-dom";
import { AlertContext } from '../../Contexts/AlertContext.js';
import {UserContext} from '../../Contexts/UserContext.js';
import {useContext} from "react";
import Alert from "../Alert/Alert.js";

export default function AddMenuItem() {

    const [userContext, setUserContext] = useContext(UserContext);
    const navigate = useNavigate();
    const [alertMessage, setAlert] = useContext(AlertContext);
    const a = { alertType: alertMessage.alertType, alertMessage: alertMessage.alertMessage }     

    // ---------------------
    // Reset alert message
    // ---------------------
    const handleAddItem = () => {

        //Item Name
        var fld = document.getElementById("itemName").value;
        if (fld === ""){
            alert("Item name not mentioned.");
            document.getElementById("itemName").focus();
            return;  
        }

        //Item Price
        fld = document.getElementById("itemPrice").value;
        if ((fld === "") || (fld ==="0")){
            alert("Item price not set.");
            document.getElementById("itemPrice").focus();
            return;  
        }

        var i_name   = document.getElementById("itemName").value;
        var i_price  = document.getElementById("itemPrice").value;
        var i_type   = (document.getElementById("chkVeg").checked === true) ? "0" : "1"; 

        var r = Math.floor((Math.random() * 10000000) + 1);
        var i_mid = "MID"+ r.toString();

        var payload = {
            "menu_id": i_mid,
            "rest_id": userContext.rest,
            "item_name": i_name,
            "item_desc": i_name,
            "item_type": i_type,
            "item_rate": i_price,
            "item_discount": "0.00",
            "item_rating": 4,
            "item_status": "1"
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
        var specificURL = "rest/api/menuitems/";
        var queryString = "";

        var url = baseURL + specificURL + queryString;   

        fetch(url, requestOptions)
            .then(response => {
                    if(response.ok)  {
                        alert("Item added. To refresh view navigate to another page and come back."); //Instead of locate state we can use application level context to fix this
                        return response.json();     
                    } 
                    return response.json().then(response => {
                        throw new Error(response.error)
                    })
                }
            )
            .then(function(data) { 
                // window.location.reload(false);
                return;             
            })
            .catch(error => {
                console.log("Error Adding Item:" + error);
                alert ("Error adding, please try again");
            });
        // fetch ends here

        document.getElementById("itemName").value = "";
        document.getElementById("itemPrice").value = "";

        return;
    }
    
    // *******************************************************************
    // *********          RETURN RESPOSNE                         ********
    // *******************************************************************
    return (
    <div>
        <div className="reg-form-container">            
            <br />
            <br />
            <div className="reg-form-components">
                <label ><b>ADD ITEM</b></label>
            </div>
            <br />

            <div className="reg-form-components">
                <label htmlFor="itemName" className="form-label" >Item Name*</label>
                <input type="text" className="form-control" id="itemName" placeholder="Item Name"/>
            </div>
            <br />
            
            <div className="reg-form-components">
                <label className="form-label" >Item Type*</label> <br/>
                <input type="radio" id="chkVeg" name="item-type" value="Veg" defaultChecked/> &nbsp;
                <label htmlFor="chkVeg">Veg</label>	&nbsp;
                <input type="radio" id="chkNonVeg" name="item-type" value="Non-Veg"/> &nbsp;
                <label htmlFor="chkNonVeg">Non-Veg</label>	&nbsp;		
            </div> 
            <br />
            
            <div className="reg-form-components">
                <label htmlFor="itemPrice" className="form-label" >Item Price*</label>
                <input type="text" className="form-control" id="itemPrice" placeholder="0"/>
            </div>
            <br />

            <div className="reg-form-components">
                <Link to="#" className="btn btn-primary" role="button" onClick={handleAddItem}>Add Item</Link>
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
