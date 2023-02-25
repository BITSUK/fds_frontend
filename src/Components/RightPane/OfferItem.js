import React from "react";
import './OfferItem.css';

export default function OfferItem(props){
    return(
        <div className="OfferItem">
			<img src ={require(`./images/offers/${props.imageName}`)} alt="" style={{width:'100%'}}/>							
		</div>        
    )
}