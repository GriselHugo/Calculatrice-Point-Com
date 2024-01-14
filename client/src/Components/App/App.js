import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';

import './App.css';

import History from '../History/History'
import Calculator from '../Calculator/Calculator'

import { IonIcon } from '@ionic/react';
import { swapHorizontal } from 'ionicons/icons';
import { sunny } from 'ionicons/icons';
import { moon } from 'ionicons/icons';

import expressServer from '../../api/api';

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [direction, setDirection] = useState('ltr')

  const [calculations, setCalculations] = useState([])

  const [displayValue, setDisplayValue] = useState('')

  useEffect(() => {
    expressServer.getCalculations()
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const calculations = response.data;
          setCalculations(calculations);
        } else {
          console.log('Error retrieving calculations');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const calculateResult = () => {
    const calculation = displayValue;
    let resultString = '';
    try {
      const result = math.evaluate(displayValue);
      setDisplayValue(result.toString());
      resultString = result.toString();
    } catch (error) {
      setDisplayValue('Error');
      resultString = 'Error';
    }

    console.log("calculation: ", calculation, " result: ", resultString);
    expressServer.addCalculation({ calculation, result: resultString })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const newCalculation = response.data;
          setCalculations([...calculations, newCalculation]);
        } else {
          console.log('Error saving calculation');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCalculation = (id) => {
    console.log(id);
    expressServer.deleteCalculation({ id })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const newCalculations = calculations.filter((calculation) => calculation.id !== id);
          setCalculations(newCalculations);
        } else {
          console.log('Error deleting calculation');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteAllCalculations = () => {
    expressServer.deleteAllCalculations()
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCalculations([]);
        } else {
          console.log('Error deleting calculations');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="app-container">
      <div className="header">
        <button onClick={() => setDirection(direction === 'ltr' ? 'rtl' : 'ltr')}>
          <IonIcon icon={swapHorizontal} />
        </button>
        <button onClick={() => setDarkMode(!darkMode)}>
          <IonIcon icon={darkMode ? sunny : moon} />
        </button>
      </div>
      <div className="content-container">
        {direction === 'ltr' ? (
          <>
            <div className="calculator-container">
              <Calculator
                darkMode={darkMode}
                displayValue={displayValue}
                setDisplayValue={setDisplayValue}
                calculateResult={calculateResult}
              />
            </div>
            <div className="history-container">
              <History
                darkMode={darkMode}
                calculations={calculations}
                deleteCalculation={deleteCalculation}
                deleteAllCalculations={deleteAllCalculations}
                setDisplayValue={setDisplayValue}
              />
            </div>
          </>
        ) : (
          <>
            <div className="history-container">
              <History
                darkMode={darkMode}
                calculations={calculations}
                deleteCalculation={deleteCalculation}
                deleteAllCalculations={deleteAllCalculations}
                setDisplayValue={setDisplayValue}
              />
            </div>
            <div className="calculator-container">
              <Calculator
              darkMode={darkMode}
              displayValue={displayValue}
              setDisplayValue={setDisplayValue}
              calculateResult={calculateResult}
            />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
