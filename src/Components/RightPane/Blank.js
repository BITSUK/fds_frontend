import React from 'react'
import './Blank.css';
import PropTypes from 'prop-types';

export default function Blank(props) {

var c2 = "alert " + props.alertType;

return (
    <div className="blank-container">       
      <div className={c2} role="alert">
           {props.message}
      </div>    
    </div>
  )
}

Blank.propTypes = {
  alertType: PropTypes.string,
  message: PropTypes.string
}
