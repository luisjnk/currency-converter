import React, { useCallback, useEffect, useState } from "react";
import "./CurrencyInput.css";
import { debounce } from "../../utils/common";

interface CurrencyInputProps {
  amount: number;
  handleAmountChange: (value: string) => void;
}

export function CurrencyInput ({ amount, handleAmountChange }: CurrencyInputProps) {
  const [formattedAmount, setFormattedAmount] = useState(formatNumber(amount));

  const debouncedHandleAmountChange = useCallback(
    debounce((value: string) => {
      handleAmountChange(value);
    }, 1000),
    [handleAmountChange]
  );

  useEffect(() => {
    setFormattedAmount(formatNumber(amount));
  }, [amount]);

  function formatNumber(value: number | string) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if(e.target.value === "" ) return;
    const value = parseFloat(e.target.value.replace(/\./g, ""));
    setFormattedAmount(formatNumber(value));
    debouncedHandleAmountChange(value);
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


