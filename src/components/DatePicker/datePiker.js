import { useState } from "react";
import { style } from './../../pages/products/style';

const div ={
    display: 'flex',

    
}

const piker={
    color: '#344767',
    border: '1px solid',
    height: '35px',
    width: '130px',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    height: '35px',
    width: 170,
    padding: '10px'

    
};
export default function DatePiker() {
    const [value, setValue] = useState();

    return (
        <div style={div}>
            
            <input style={piker} type="date" id="date"/>
             <p style={{marginLeft: '10px', marginRight: '10px'}}> - </p>
            <input style={piker} type="date" id="date"/>
        </div>
      );


}