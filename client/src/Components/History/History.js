import React, { useState } from 'react';

import './History.css';

function History({ darkMode, calculations, deleteCalculation, deleteAllCalculations }) {
  const [selectedCalculation, setSelectedCalculation] = useState(null);


  return (
    <div className={`history ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="calculations-container">
        {
          calculations.map((calculation) => (
            <div className="calculation" key={calculation.id} onClick={() => setSelectedCalculation(calculation)}>
              <div className="calculation-calculation">{calculation.calculation}</div>
              <div className="calculation-result">{calculation.result}</div>
            </div>
          ))
        }
      </div>
      <div className="buttons-container">
        <button className="delete-all-button" onClick={deleteAllCalculations}>Delete All</button>
        <button className="delete-button" onClick={() => deleteCalculation(selectedCalculation.id)}>Delete</button>
      </div>
    </div>
  );
}

export default History;
