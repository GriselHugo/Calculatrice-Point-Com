import React, { useState } from 'react'
import './App.css';

import History from '../History/History'
import Calculator from '../Calculator/Calculator'

import { IonIcon } from '@ionic/react';
import { swapHorizontal } from 'ionicons/icons';
import { sunny } from 'ionicons/icons';
import { moon } from 'ionicons/icons';

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [direction, setDirection] = useState('ltr')

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
              <Calculator darkMode={darkMode} />
            </div>
            <div className="history-container">
              <History darkMode={darkMode} />
            </div>
          </>
        ) : (
          <>
            <div className="history-container">
              <History darkMode={darkMode} />
            </div>
            <div className="calculator-container">
              <Calculator darkMode={darkMode} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
