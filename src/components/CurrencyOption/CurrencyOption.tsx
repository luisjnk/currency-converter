import React from "react";
import { SupportedCurrency } from "../../utils/commomTypes";

interface CurrencyOptionProps {
  currency: SupportedCurrency;
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
      {currency.name}
    </div>
  );
}