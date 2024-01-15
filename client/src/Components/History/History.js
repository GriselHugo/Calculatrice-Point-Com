import React, { useState, useEffect } from 'react';

import './History.css';

function History({ darkMode, calculations, deleteCalculation, deleteAllCalculations, setDisplayValue }) {
  const [selectedCalculation, setSelectedCalculation] = useState(null);
  const [deleteCalculationDisplay, setdeleteCalculationDisplay] = useState(false);
  const [deleteAllCalculationsDisplay, setdeleteAllCalculationsDisplay] = useState(false);

  useEffect(() => {
    calculations.length > 0 ? setdeleteAllCalculationsDisplay(true) : setdeleteAllCalculationsDisplay(false);
  }, [calculations]);

  const selectCalculation = (calculation) => {
    if (selectedCalculation === calculation) {
      setSelectedCalculation(null);
      setdeleteCalculationDisplay(false);
      setDisplayValue('');
    } else {
      setSelectedCalculation(calculation);
      setdeleteCalculationDisplay(true);
      setDisplayValue(calculation.calculation);
    }
  }

  return (
    <div className={`history ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div>
      <div className="calculations-container" style={{ border: darkMode ? '1px solid #cccccc' : '1px solid #333333' }}>
        {
          calculations.map((calculation) => (
            <div
              key={calculation.id}
              onClick={() => selectCalculation(calculation)}
              className={`calculation
                ${darkMode ? 'dark-mode' : 'light-mode'}
                ${selectedCalculation === calculation ? 'selected' : ''}
              `}
            >
              <div className="calculation-calculation">{calculation.calculation}</div>
              <div className="calculation-result">{calculation.result}</div>
            </div>
          ))
        }
      </div>
      <div className="buttons-container">
        {/* <button className="delete-all-button" onClick={deleteAllCalculations}>Delete All</button> */}
        {
          deleteAllCalculationsDisplay &&
            <button className="delete-all-button" onClick={deleteAllCalculations}>Delete All</button>
        }
        {
          deleteCalculationDisplay &&
            <button className="delete-button" onClick={() => deleteCalculation(selectedCalculation.id)}>Delete</button>
        }
      </div>
      </div>
    </div>
  );
}

export default History;
