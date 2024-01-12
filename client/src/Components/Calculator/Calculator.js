import React, { useState } from 'react';
import * as math from 'mathjs';

import './Calculator.css';

function Calculator({ darkMode }) {
  const [displayValue, setDisplayValue] = useState('');

  const appendToDisplay = (value) => {
    if (
      displayValue === 'NaN' ||
      displayValue === 'Error' ||
      displayValue === 'undefined' ||
      displayValue === 'Infinity'
    ) {
      setDisplayValue(value);
      return;
    }
    setDisplayValue(displayValue + value);
  };

  const clearDisplay = () => {
    setDisplayValue('');
  };

  const calculateResult = () => {
    try {
      const result = math.evaluate(displayValue);
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const buttonConfig = [
    { value: 'C', color: 'red' },
    { value: '(', color: 'green' },
    { value: ')', color: 'green' },
    { value: '/', color: 'green' },
    { value: '7', color: 'color' },
    { value: '8', color: 'color' },
    { value: '9', color: 'color' },
    { value: '*', color: 'green' },
    { value: '4', color: 'color' },
    { value: '5', color: 'color' },
    { value: '6', color: 'color' },
    { value: '-', color: 'green' },
    { value: '1', color: 'color' },
    { value: '2', color: 'color' },
    { value: '3', color: 'color' },
    { value: '+', color: 'green' },
    { value: '.', color: 'color' },
    { value: '0', color: 'color' },
    { value: '=', color: 'green-white' },
  ];

  return (
    <div className={`calculator ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div id="calculator" className={`${darkMode ? 'dark-calculator' : 'light-calculator'}`}>
        <input type="text" id="display" value={displayValue} readOnly />
        <br />

        <div className="grid-container">
          {
            buttonConfig.map((button) => (
              <button
                key={button.value}
                onClick={() => {
                  button.value === 'C'
                    ? clearDisplay()
                    : button.value === '='
                      ? calculateResult()
                      : appendToDisplay(button.value);
                }}
                className={`grid-item
                  ${darkMode ? `dark-${button.color}` : `light-${button.color}`}
                  ${button.value === '=' ? 'double-size' : ''}`
                }
              >
                {button.value}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Calculator;
