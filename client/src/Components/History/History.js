import React from 'react';

import './History.css';

function History({ darkMode }) {
  return (
    <div className={`history ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      History
    </div>
  );
}

export default History;
