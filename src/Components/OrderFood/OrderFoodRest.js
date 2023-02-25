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

    //Filter Restaurants JSON
    const filteredRestaurants = Restaurants.filter(e => 
        (e.rest_location_code.toLowerCase().includes(inpParms["station_code"].toLowerCase())));

    const currentItems = filteredRestaurants.filter(e => 
        (e.rest_name.toLowerCase().includes(query.toLowerCase())));

    //Search in Stations JSON
    const stationTrainXREF = Stations.filter(e => (e.station_code.includes(inpParms["station_code"])));

    //Search in Trains JSON
    const trainStationXREF = Trains.filter(e => (e.train_no.includes(inpParms["train_no"])));

    //Update station and train in userContext
    var updatedUserContext = userContext;
    updatedUserContext.station = inpParms["station_code"]
    updatedUserContext.stationName = stationTrainXREF[0].station_name;
    updatedUserContext.train = inpParms["train_no"]
    updatedUserContext.trainName = trainStationXREF[0].train_name;
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
