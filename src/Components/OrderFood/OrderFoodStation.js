import React from "react";
import './OrderFood.css';
import { useParams } from "react-router-dom";
import Stations from '../../Data/Stations.json';
import {Link} from "react-router-dom";
import { useContext, useState } from "react";
import {UserContext} from '../../Contexts/UserContext.js';
import Alert from "../Alert/Alert.js";

function StationRow(props) {
    return (
        <>
            <tr>
                <td scope="row">
                    <Link to={`/order-food/rest/${props.s_code}/${props.t_no}`} key={props.s_name}>
                         {props.t_no} ({props.t_name})
                    </Link>
                </td>
                <td>{props.a_time}</td>
                <td>{props.d_time}</td>
                <td>{props.s_halt}</td>
            </tr>            
        </>
    );
}
export default function OrderFoodStation(){
    const [userContext, setUserContext] = useContext(UserContext);
    const inpParms = useParams(); 

    //Search in Stations JSON
    const stationTrainXREF = Stations.filter(e => (e.station_code.includes(inpParms["station_code"])));

    //Update selected station in userContext
    var updatedUserContext = userContext;
    updatedUserContext.station = inpParms["station_code"]
    updatedUserContext.stationName = stationTrainXREF[0].station_name;
    setUserContext(updatedUserContext);

    //************ RETURN RESPONSE ************
    return(
        <>
            <Alert />
            <div> 
				<div>                
				    <b>Station : {inpParms["station_code"]} - {stationTrainXREF[0].station_name}</b>
                </div>
                <hr/>
                <table class="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">Train</th>
                    <th scope="col">Arrival</th>
                    <th scope="col">Departure</th>
                    <th scope="col">Halt</th>
                    </tr>
                </thead>
                <tbody>
                    {stationTrainXREF.length === 0 ? (
                        <div>
                            <p className="table-row"><b>"No train found"</b></p>
                        </div>
                    ) : ( stationTrainXREF.map(record1 => ( record1.trains.map( record2 => (
                            // <div className="table-row">                                    
                            //     <Link to={`/order-food/rest/${record1.station_code}/${record2.train_no}`} key={record1.station_code}>
                            //     - {record2.train_no}:{record2.train_name} 
                            //     </Link>
                            // </div>
                            <StationRow 
                                s_code={record1.station_code} 
                                s_name={record1.station} 
                                t_no={record2.train_no}  
                                t_name={record2.train_name}
                                a_time={record2.arrival_time}                                  
                                d_time={record2.departure_time}
                                s_halt={record2.halt}
                            />
                        ))))
                    )}
                </tbody>
                </table>   
			</div>
        </>
    )    
}
