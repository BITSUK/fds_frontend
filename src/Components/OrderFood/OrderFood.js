import React from "react";
import FoodItemsDisplay from '../CentralPane/FoodItemsDisplay.js';
import CustomerJourney from '../CentralPane/CustomerJourney.js';
import Testimonials from '../CentralPane/Testimonials.js';
import { useContext, useState, useEffect } from "react";
import './OrderFood.css';
// import Stations from '../../Data/Stations.json';
// import Trains from '../../Data/Trains.json';
import {Link} from "react-router-dom";
import {UserContext} from '../../Contexts/UserContext.js';

// alert("*** OUTSIDE ***");
const DATE_TODAY = new Date().toISOString().substr(0, 10);

export default function OrderFood(){
    // alert("- inside -");
    const [userContext, setUserContext] = useContext(UserContext);
    const [mode, setMode] = useState("-");
    const [query, setQuery] = useState("");
    const [stationsdata, setStationsdata] = useState([{"station_code": "", "station_name": "" }]);
    const [trainsdata, setTrainsdata] = useState([{"train_no": "","train_name": ""}]);

        //fetch stations
        useEffect(() => {
            const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/fds/rest/api/stations/');
            const data = await response.json();
            // console.log(data.results);
            setStationsdata(data.results);
            };

            fetchData();
        }, []);

        //fetch trains
        useEffect(() => {
            const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/fds/rest/api/trains/');
            const data = await response.json();
            // console.log(data.results);
            setTrainsdata(data.results);
            };

            fetchData();
        }, []);
    
    //Stations.filter
    const stationsList = stationsdata.filter(e => (e.station_code.toLowerCase().includes(query.toLowerCase())) || 
                                            (e.station_name.toLowerCase().includes(query.toLowerCase())) );   
    
    // Trains.filter
    const trainsList = trainsdata.filter(e => (e.train_no.toLowerCase().includes(query)) ||
                                        (e.train_name.toLowerCase().includes(query))  );
            
    //Function to validate journey date
    const checkJourneyDate = () => {

        var inptJDate = document.getElementById("jdate").value;

        if (inptJDate === "") {         
            inptJDate = DATE_TODAY;
        } else {         
            if (inptJDate < DATE_TODAY) { 
                alert("Journey cannot be in past. Defaulted to today's date.") ;
                inptJDate = DATE_TODAY;
            }
        }
        document.getElementById("jdate").value = inptJDate;

        //update User Context
        var updatedUserContext = userContext;
        if (inptJDate != updatedUserContext.jdate) {
            updatedUserContext.jdate = inptJDate;
            setUserContext(updatedUserContext);
        }

    }   

    //Set mode depending what user choose - Train or Station
    const handleRadioClick = (event) => {

        if (document.getElementById("radioTrain").checked == true ) { 
            setMode("t"); //Train
        } else if (document.getElementById("radioStation").checked == true ) { 
            setMode("s"); //Station
        } else {
            setMode("-"); //Default
        }
        checkJourneyDate();
    }
    
    //Handle Date Change
    const handleDateChange = (event) => {
        checkJourneyDate();
    }

    //Handle Search Button Click
    const handleSubmit = (event) => {
        event.preventDefault();     

        if  ((document.getElementById("radioTrain").checked == false ) &&  
             (document.getElementById("radioStation").checked == false )) { 
         
            document.getElementById("radioTrain").checked = true;
            setMode("t"); 
        }       
        
        checkJourneyDate();
    }

    //************ RETURN RESPONSE ************
    return(
        <>
            <div id="order-bar">
				<br/>                
				<span id="OrderNowText"><b>Order Now:&nbsp;&nbsp;&nbsp;</b></span>
				<input type="radio" id="radioTrain" name="search-options" value="Train" onClick={handleRadioClick}/>&nbsp;
				<label htmlFor="radioTrain">Train No</label>&nbsp;&nbsp;&nbsp;
				<input type="radio" id="radioStation" name="search-options" value="Station" onClick={handleRadioClick}/>&nbsp;
				<label htmlFor="radioStation">Station</label>&nbsp;&nbsp;&nbsp;
                <span>&nbsp;&nbsp;&nbsp;<b>Journey Date:&nbsp;&nbsp;</b></span>
                <input type="date" id="jdate" name="jdate" onChange={handleDateChange}></input>
			</div>
			<div id="search-container">
				<form action="#">
					<input type="text" placeholder="Search.." name="search" id="searchBox" onChange={e => setQuery(e.target.value)}/>
					<button type="submit" id="srchBtn" onClick={handleSubmit}>Search</button>
				</form>
			</div>
           {(mode == "-") && <FoodItemsDisplay />}
           {(mode == "-") && <CustomerJourney />}
           {(mode == "-") && <Testimonials />}    

           {(mode == "t") && 
                    <div> 
                        <div className="title"><b>List of Trains:</b></div>
                        
                        {trainsList.length === 0 ? (
                            <div>
                                <p className="table-row"><b>""</b></p>
                            </div>
                        ) : (   trainsList.map(record => (
                                <div className="table-row">                                     
                                    <Link to={`/order-food/train/${record.train_no}` } key={record.id}>
                                       {record.train_no} : {record.train_name}
                                    </Link>
                                </div>
                            ))
                         )}
                    </div>
           }
           {(mode == "s") && <div> 
                        <div className="title"><b>List of Stations:</b></div>
                        {stationsList.length === 0 ? (
                            <div>
                                <p className="table-row"><b>None</b></p>
                            </div>
                        ) : (   stationsList.map(record => (
                                <div className="table-row">                                    
                                    <Link to={`/order-food/station/${record.station_code}`} key={record.id}>
                                       {record.station_name} ({record.station_code})
                                    </Link>
                                </div>
                            ))
                         )}
                    </div>
           }
        </>
    )    
}
