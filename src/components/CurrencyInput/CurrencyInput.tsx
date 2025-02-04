import React, { useCallback, useState } from "react";
import "./CurrencyInput.css";
import { debounce } from "../../utils/common";
import { formatToLocaleString, formatToNumber } from "../../utils/helpers";

interface CurrencyInputProps {
  amount: number;
  handleAmountChange: (value: string) => void;
}

export function CurrencyInput({ amount, handleAmountChange }: CurrencyInputProps) {

  const [inputValue, setInputValue] = useState('')


  const debouncedOnInputChange = useCallback(debounce(handleAmountChange, 300), [])
  const handleInputChange = (entry: string) => {
    try {
      setInputValue(formatToLocaleString(entry))
      debouncedOnInputChange(formatToNumber(entry))
    } catch (error) {
      console.warn(error)
    }
  }

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
};
