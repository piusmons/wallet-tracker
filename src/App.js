import './App.css';
import WalletInput from './components/WalletInput';
import { Network, Alchemy } from 'alchemy-sdk';
import React, { useState, useEffect, useContext } from 'react';

function App() {
  

  



  return (
    
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      
      <div className="topContainer">
        <WalletInput></WalletInput>
      </div>
      
    </div> 
  );
}

export default App;
