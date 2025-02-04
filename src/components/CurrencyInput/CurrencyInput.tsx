import React, { useState } from "react";
import "./CurrencyInput.css";
import { debounce } from "../../utils/common";

interface CurrencyInputProps {
  amount: number;
  handleAmountChange: (value: string) => void;
}

export function CurrencyInput ({ amount, handleAmountChange }: CurrencyInputProps) {
  const [formattedAmount, setFormattedAmount] = useState(formatNumber(amount));
  const debouncedhandleAmountChange  = handleAmountChange ? debounce(handleAmountChange, 1000) : () => {};

  function formatNumber(value: number | string) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\./g, "");
    setFormattedAmount(formatNumber(value));
    debouncedhandleAmountChange(value);
  }
  
  return (
      <input
        type="text"
        value={formattedAmount}
        onChange={handleChange}
        className="currency-input"
        placeholder="0.00"
      />
  );
};


