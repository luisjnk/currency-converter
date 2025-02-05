import React, { useCallback, useRef, useState } from 'react';
import './CurrencyInput.css';
import {
  formatToLocaleString,
  formatToNumber,
} from '../../utils/helpers';
import { useDebounce } from '../../hooks/useDebounce';

interface CurrencyInputProps {
  amount: number;
  handleAmountChange: (value: string) => void;
}

export function CurrencyInput({
  amount,
  handleAmountChange,
}: CurrencyInputProps) {
  const [inputValue, setInputValue] = useState('');

  // Debounced function to handle input change
  const debounce = useDebounce(handleAmountChange, 400);

  // Handle input change and format the value
  const handleInputChange = (entry: string) => {
    try {
      setInputValue(formatToLocaleString(entry));
      debounce(formatToNumber(entry).toString());
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <input
      data-testid="currency-input"
      value={inputValue}
      onChange={(e) => handleInputChange(e.target.value)}
      className="currency-input"
      maxLength={12}
      placeholder="0.00"
    />
  );
}