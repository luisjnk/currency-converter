import React from 'react';
import './RatesList.css';
import { supportedCurrencies } from '../../utils/supportedCurrencies';

interface ExchangeRate {
  rate: string;
  currency: string;
}

interface RatesListProps {
  rates: ExchangeRate[];
  amount: number;
}

export function RatesList({ rates, amount }: RatesListProps) {
  const getCurrencyImagePath = (currency: string) => {
    const currencyData = supportedCurrencies.find(({ name }) => name === currency);
    return currencyData ? currencyData.path : '';
  }
  return (
    <ul className="rates-list">
      {rates.map((rate) => (
        <li className='rate-item-content' key={rate.currency}>
          <span className="rate-item-currency">
            {(amount * parseFloat(rate.rate)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <div>
            <img src={getCurrencyImagePath(rate.currency)} alt={rate.currency} />
            <span className="rate-item-currency">{rate.currency}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
