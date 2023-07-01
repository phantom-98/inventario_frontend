import { useState } from "react";


const piker={
    
    
    color: '#17c1e8',
    border: '1px solid',
    height: '35px',
    width: '130px',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
    height: '35px',
    width: 150
    
};
export default function DatePiker() {
    const [value, setValue] = useState();

    return (
        <div>
        
            <input style={piker} type="date" id="date"/>
            a
            <input style={piker} type="date" id="date"/>
        </div>
      );


}