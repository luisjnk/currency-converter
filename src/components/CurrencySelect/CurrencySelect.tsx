import React from "react";
import { SupportedCurrency } from "../../utils/commomTypes";
import "./CurrencySelect.css";

interface CurrencySelectProps {
    supportedCurrencies: SupportedCurrency[];
    selectedCurrency: string;
    handleCurrencyChange: (value: string) => void;
}

export function CurrencySelect ({ supportedCurrencies, selectedCurrency, handleCurrencyChange }: CurrencySelectProps) {
  return (
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
  );
};


