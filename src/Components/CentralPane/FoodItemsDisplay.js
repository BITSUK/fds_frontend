import React from "react";

import food1 from './images/food/1.png'
import food2 from './images/food/2.png'
import food3 from './images/food/3.png'
import './FoodItemsDisplay.css';

export default function FoodItemsDisplay(){
    return (
        <>
            <div className="food-items">
				<div className="food-item"> <img src={food1} alt="Snow" style={{width:'100%'}}/> </div>
				<div className="food-item"> <img src={food2} alt="Forest" style={{width:'100%'}}/> </div>
				<div className="food-item"> <img src={food3} alt="Mountains" style={{width:'100%'}}/> </div>
			</div>
        </>

    )

}