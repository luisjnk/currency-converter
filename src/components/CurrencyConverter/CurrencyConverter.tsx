import React from "react";
import { supportedCurrencies } from '../../utils/supportedCurrencies';
import { CurrencySelect } from "../CurrencySelect/CurrencySelect";
import { CurrencyInput } from "../CurrencyInput/CurrencyInput";
import "./CurrencyConverter.css";

interface CurrencyConverterProps {
  amount: number;
  selectedCurrency: string;
  handleAmountChange: (value: string) => void;
  handleCurrencyChange: (value: string) => void;
}

export function CurrencyConverter ({ amount, handleAmountChange, selectedCurrency, handleCurrencyChange }: CurrencyConverterProps) {
  return (
    <div className="currency-input-container">
      <CurrencyInput
      amount={amount}
      handleAmountChange={handleAmountChange}
      />
      <CurrencySelect
      selectedCurrency={selectedCurrency}
      handleCurrencyChange={handleCurrencyChange}
      supportedCurrencies={supportedCurrencies}
      />
    </div>
  );
};


