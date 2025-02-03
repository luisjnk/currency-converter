import React from "react";
import "./CurrencyInput.css";
import { supportedCurrencies } from '../../utils/supportedCurrencies';

interface CurrencyInputProps {
  amount: number;
  selectedCurrency: string;
  handleAmountChange: (value: string) => void;
  handleCurrencyChange: (value: string) => void;
}

export function CurrencyInput ({ amount, handleAmountChange, selectedCurrency, handleCurrencyChange }: CurrencyInputProps) {
  return (
    <div className="currency-input-container">
      <input
        type="number"
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
        className="currency-input"
        placeholder="0.00"
      />
      <select
        value={selectedCurrency}
        onChange={(e) => handleCurrencyChange(e.target.value)}
        className="currency-dropdown"
      >
        {supportedCurrencies.map((currency) => (
          <option key={currency.name} value={currency.name}>
            {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};
