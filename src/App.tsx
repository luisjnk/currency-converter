import React, { useState } from 'react';
import './App.css';
import { CurrencyConverter } from './components/CurrencyConverter';
import { useExchangeRates } from './hooks';
import { Loading, RatesList, Error } from './components';

function App() {
  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Fetch exchange rates using the custom hook
  const { rates, isLoading, isError, errorMessage } = useExchangeRates(
    selectedCurrency,
    amount
  );

  console.log("rates", rates);
  // Handle amount change
  const handleAmountChange = (value: string) => {
    setAmount(parseFloat(value));
  };

  // Handle currency change
  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  return (
    <div className="home">
      <div className="container">
        <div className="currency-converter">
          <h1>Currency Converter</h1>
          <p className="grey-text">
            Receive competitive and transparent pricing with no hidden spreads.
            See how we compare.
          </p>
          <CurrencyConverter
            amount={amount}
            selectedCurrency={selectedCurrency}
            handleAmountChange={handleAmountChange}
            handleCurrencyChange={handleCurrencyChange}
          />
          {isLoading && <Loading />}
          {isError && errorMessage && <Error message={errorMessage} />}
          {amount > 0 && <RatesList rates={rates} amount={amount} />}
        </div>
      </div>
    </div>
  );
}

export default App;
