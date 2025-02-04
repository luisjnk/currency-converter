import React, { useState } from 'react';
import './App.css';
import { CurrencyConverter } from './components/CurrencyConverter';

function App() {
  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleAmountChange = (value: string) => {
    console.log("AQUIII ", value);
    setAmount(parseFloat(value));
  };

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  return (
    <div className="home-container">
      <div className="converter-section">
        <header >
          <h1>Currency Converter</h1>
          <p>Receive competitive and transparent pricing with no hidden spreads. See how we compare.</p>
        </header>
        <main className='home-main-container'>
          <CurrencyConverter amount={amount} selectedCurrency={selectedCurrency} handleAmountChange={handleAmountChange} handleCurrencyChange={handleCurrencyChange} />
        </main>
      </div>
    </div>
  );
}

export default App;
