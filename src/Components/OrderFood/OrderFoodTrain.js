import React from "react";
import './OrderFood.css';
import { useParams } from "react-router-dom";
import Trains from '../../Data/Trains.json';
import {Link} from "react-router-dom";
import { useContext, useState } from "react";
import {UserContext} from '../../Contexts/UserContext.js';
import Alert from "../Alert/Alert.js";

function TrainRow(props) {
    return (
        <>
            <tr>
                <td scope="row">
                    <Link to={`/order-food/rest/${props.s_code}/${props.t_no}`} key={props.s_name}>
                         {props.s_name} ({props.s_code})
                    </Link>
                </td>
                <td>{props.a_time}</td>
                <td>{props.d_time}</td>
                <td>{props.s_halt}</td>
                <td>{props.a_day}</td>
            </tr>            
        </>
    );
}

export default function OrderFoodTrain(){
    const [userContext, setUserContext] = useContext(UserContext);
    const inpParms = useParams(); 

    //Search in Trains JSON
    const trainStationXREF = Trains.filter(e => (e.train_no.includes(inpParms["train_no"])));

    //Update selected train in userContext
    var updatedUserContext = userContext;
    updatedUserContext.train = inpParms["train_no"];
    updatedUserContext.trainName = trainStationXREF[0].train_name;
    setUserContext(updatedUserContext);

    //************ RETURN RESPONSE ************
    return(
        <>
            <Alert />
            <div> 
				<div>
				    <b>Train : {inpParms["train_no"]} - {trainStationXREF[0].train_name}</b>
                </div>
                <hr/>
                <table class="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">Station</th>
                    <th scope="col">Arrival</th>
                    <th scope="col">Departure</th>
                    <th scope="col">Halt</th>
                    <th scope="col">Day</th>
                    </tr>
                </thead>
                <tbody>
                    {trainStationXREF.length === 0 ? (
                        <div>
                            <p className="table-row"><b>"No station found"</b></p>
                        </div>
                    ) : ( trainStationXREF.map(record1 => ( record1.train_stations.map( record2 => (
                            // <div className="table-row">                                    
                            //     <Link to={`/order-food/rest/${record2.station_code}/${record1.train_no}`} key={record2.station}>
                            //     - {record2.station} ({record2.station_code})
                            //     </Link>
                            // </div>
                            <TrainRow 
                                    s_code={record2.station_code} 
                                    s_name={record2.station} 
                                    t_no={record1.train_no}  
                                    a_time={record2.arrival_time}                                  
                                    d_time={record2.departure_time}
                                    s_halt={record2.halt}
                                    a_day={record2.arrival_day}
                            />
                        ))))
                    )}
                </tbody>
                </table>
			</div>
        </>
    )    
}
