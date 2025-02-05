import React from 'react';
import { Currency } from '../../utils/supportedCurrencies';
import './CurrencyOption.css';

interface CurrencyOptionProps {
  currency: Currency;
  handleCurrencyChange: (value: string) => void;
}

export function CurrencyOption({
  currency,
  handleCurrencyChange,
}: CurrencyOptionProps) {
  return (
    <div
      className="currency-c"
      onClick={() => handleCurrencyChange(currency.name)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        cursor: 'pointer',
      }}
    >
      <div className="currency-option space">
        <img
          src={currency.path}
          alt={currency.name}
          style={{ width: '24px', marginRight: '8px' }}
        />
        {currency.name}
      </div>
    </div>
  );
}
