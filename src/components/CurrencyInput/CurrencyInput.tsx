import React from "react";
import "./CurrencyInput.css";

interface CurrencyInputProps {
  amount: number;
  handleAmountChange: (value: string) => void;
}

export function CurrencyInput ({ amount, handleAmountChange }: CurrencyInputProps) {
  return (
      <input
        type="number"
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
        className="currency-input"
        placeholder="0.00"
      />
  );
};


