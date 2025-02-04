import React, { useState } from "react";

import "./CurrencySelect.css";
import { CurrencyOption } from "../CurrencyOption/CurrencyOption";



interface SupportedCurrency {
  name: string;
  path: string;
}

interface CurrencySelectProps {
  supportedCurrencies: SupportedCurrency[];
  selectedCurrency: string;
  handleCurrencyChange: (value: string) => void;
}

export function CurrencySelect({ supportedCurrencies, selectedCurrency, handleCurrencyChange }: CurrencySelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCurrencyData = supportedCurrencies.find(currency => currency.name === selectedCurrency);

  return (
    <div className="currency-select">
      <div
        className="selected-currency"
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        {selectedCurrencyData && (
          <>
            <img src={selectedCurrencyData.path} alt={selectedCurrencyData.name} style={{ width: '24px', marginRight: '8px' }} />
            {selectedCurrencyData.name}
            <img src="/dropdown-icon.svg" alt="Dropdown Icon" style={{ width: '8px', marginLeft: '8px' }} />
          </>
        )}
      </div>
      {isOpen && (
        <div className="currency-options">
          {supportedCurrencies.map((currency) => (
            <CurrencyOption key={currency.name} currency={currency} handleCurrencyChange={handleCurrencyChange} />
          ))}
        </div>
      )}
    </div>
  );
};


