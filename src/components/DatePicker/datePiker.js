import { useState } from "react";
import { style } from './../../pages/products/style';
import PropTypes from "prop-types";

const div ={
    display: 'flex',

    
}

const piker={
    color: '#344767',
    border: '1px solid',
    height: '35px',
    width: '130px',
    borderRadius: 10,
    fontSize: 12,
    fontWeight: '500',
    height: '35px',
    width: 170,
    padding: '10px'

    
};

import moment from "moment";
const DatePiker = ({value, handleDateChange})=> {
 

    return (
        <div style={div}>
            
            <input 
                name="startAt" 
                style={piker} 
                type="date" 
                id="date"  
                value={value.startAt} 
                onChange={handleDateChange}
            />
            <p style={{marginLeft: '10px', marginRight: '10px', marginBottom: '0px'}}> - </p>
            <input 
                name="endAt" 
                style={piker} 
                type="date" 
                id="date" 
                value={value.endAt} 
                onChange={handleDateChange}
            />
        </div>
      );


}

DatePiker.propTypes = {
    value: PropTypes.object,
    handleDateChange: PropTypes.func
};

export default DatePiker
  