import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Restaurants from '../../Data/Restaurants.json';
import Stations from '../../Data/Stations.json';
import Trains from '../../Data/Trains.json';
import './OrderFoodRest.css';
import { useParams } from "react-router-dom";
import {UserContext} from '../../Contexts/UserContext.js';
import { useContext } from "react";
import Alert from "../Alert/Alert.js";


export default function OrderFoodRest() {
    const [userContext, setUserContext] = useContext(UserContext);
    const inpParms = useParams();
    const [query, setQuery] = useState("");
    const [stationsdata, setStationsdata] = useState([{"station_code": "", "station_name": "" }]);
    const [trainsdata, setTrainsdata] = useState([{"train_no": "","train_name": ""}]);
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

        //fetch trains
        useEffect(() => {
            const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/fds/rest/api/restaurants/');
            const data = await response.json();
            // console.log(data.results);
            setRestaurantsdata(data.results);
            };

            fetchData();
        }, []);

    //Filter Restaurants JSON
    const filteredRestaurants = restaurantsdata.filter(e => 
        (e.rest_location_code.toLowerCase().includes(inpParms["station_code"].toLowerCase())));

    const currentItems = filteredRestaurants.filter(e => 
        (e.rest_name.toLowerCase().includes(query.toLowerCase())));

    //Search in Stations JSON
    const stationLIST = stationsdata.filter(e => (e.station_code.includes(inpParms["station_code"])));

    //Search in Trains JSON
    const trainLIST = trainsdata.filter(e => (e.train_no.includes(inpParms["train_no"])));

    //Update station and train in userContext
    var updatedUserContext = userContext;
    updatedUserContext.station = inpParms["station_code"]
    updatedUserContext.stationName = (stationLIST.length === 0)? "" :stationLIST[0].station_name;
    updatedUserContext.train = inpParms["train_no"]
    updatedUserContext.trainName = (trainLIST.length === 0)? "" : trainLIST[0].train_name;
    setUserContext(updatedUserContext);

    //************** RETURN RESPONSE ***************
    return (
        <>
            <Alert />
            <div className="container-fluid">
                <div className="row content">
                    <div>
                        Restaurants at <b>{userContext.stationName}</b>, your train is <b>{userContext.train} : {userContext.trainName}</b>
                    </div>
                    <br/>
                    <div className="col-sm-12">
                        <div >
                            <input type="text" className="form-control" id="Search" placeholder="Filter Restaurant..." onChange={e => setQuery(e.target.value)} />
                        </div>                               
                        <hr/>
                        {filteredRestaurants.length === 0 ? (
                            <div className="row">
                            <div className="col-sm-8">
                                <br />
                                <div >
                                <p>No restaurant found</p>
                                </div>
                            </div>
                            </div>
                        ) : (
                        currentItems.map(record => (
                        <div className="table-row">
                            <div className="col-sm-8">
                                <div >                        
                                    <p key={record.rest_id}>{record.rest_name}</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div >                            
                                    <Link to={`/order-food/restaurant/${record.rest_id}`} key={record.rest_id}>Order Now</Link>
                                </div>
                            </div>
                        </div>
                        ))
                    )}

                </div>
            </div>
            </div>
        </>
  );
}
