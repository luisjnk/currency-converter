import React, { useState } from 'react';
import './App.css';
import { CurrencyConverter } from './components/CurrencyConverter';
import { useExchangeRates } from './hooks';
import { Loading, RatesList } from './components';

function App() {
  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const { rates, isLoading, isError } = useExchangeRates(selectedCurrency, amount);

  console.log(`Rates: ${rates}`, `isLoading: ${isLoading}`, `isError: ${isError}`);

  const handleAmountChange = (value: string) => {
    setAmount(parseFloat(value));
  };

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  return (
    <div className="home">
      <div className="container">
        <div className="currency-converter-section">
          <h1>Currency Converter</h1>
          <p>Receive competitive and transparent pricing with no hidden spreads. See how we compare.</p>
          <CurrencyConverter amount={amount} selectedCurrency={selectedCurrency} handleAmountChange={handleAmountChange} handleCurrencyChange={handleCurrencyChange} />
          <RatesList rates={rates} amount={amount} />
          {isLoading && <Loading />}
        </div>
      </div>
    </div>
  );
}

export default App;
