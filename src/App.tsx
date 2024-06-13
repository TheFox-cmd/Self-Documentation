import './App.css';
import PageAttribute from './attribute'
import Login from './components/login';

import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  // const [validToken, setValidToken] = useState<boolean>(!!localStorage.getItem('token'));
  const [update, setUpdate] = useState<boolean>(false)

  /**
   * TODO: 
   * * 1. use context store for update, potentially redux 
   * * 2. update page base on token 
   */


  return (
    <div className="flex w-screen h-screen bg-stone-900">
      {update ? <PageAttribute setUpdate={setUpdate} /> : <Login setUpdate={setUpdate} />}
    </div>
  );
};

export default App