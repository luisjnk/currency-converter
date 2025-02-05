import React, { useState, useEffect, useRef } from 'react';
import './CurrencySelect.css';
import { CurrencyOption } from '../CurrencyOption/CurrencyOption';

interface SupportedCurrency {
  name: string;
  path: string;
}

interface CurrencySelectProps {
  supportedCurrencies: SupportedCurrency[];
  selectedCurrency: string;
  handleCurrencyChange: (value: string) => void;
}

export function CurrencySelect({
  supportedCurrencies,
  selectedCurrency,
  handleCurrencyChange,
}: CurrencySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedCurrencyData = supportedCurrencies.find(
    (currency) => currency.name === selectedCurrency
  );
  const filteredCurrencies = supportedCurrencies.filter(
    (currency) => currency.name !== selectedCurrency
  );

  // Handle clicks outside the component to close the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle option click and close the dropdown
  const handleOptionClick = (value: string) => {
    handleCurrencyChange(value);
    setIsOpen(false);
  };

  return (
    <div className="currency-select" ref={ref}>
      <div
        className="selected-currency"
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        {selectedCurrencyData && (
          <>
            <img
              src={selectedCurrencyData.path}
              alt={selectedCurrencyData.name}
              style={{ width: '24px', marginRight: '8px' }}
            />
            {selectedCurrencyData.name}
            <img
              src="/dropdown-icon.svg"
              alt="Dropdown Icon"
              style={{ width: '8px', marginLeft: '8px' }}
            />
          </>
        )}
      </div>
      {isOpen && (
        <div className="currency-options">
          {filteredCurrencies.map((currency) => (
            <CurrencyOption
              key={currency.name}
              currency={currency}
              handleCurrencyChange={handleOptionClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
