import React from "react";
import { Currency } from "../../utils/supportedCurrencies";

interface CurrencyOptionProps {
  currency: Currency;
  handleCurrencyChange: (value: string) => void;
}

export function CurrencyOption({ currency, handleCurrencyChange }: CurrencyOptionProps) {
  console.log("currencypaty", currency.path)
  return (
    <div
      className="currency-option"
      onClick={() => handleCurrencyChange(currency.name)}
      style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer' }}
    >
      <img src={currency.path} alt={currency.name} style={{ width: '20px', marginRight: '8px' }} />
      <b>{currency.name}</b>

    </div>
  );
}