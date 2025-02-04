import React from 'react';
import './RatesList.css';
import { supportedCurrencies } from '../../utils/supportedCurrencies';

interface ExchangeRate {
  rate: string;
  currency: string;
}

interface RatesListProps {
  rates: ExchangeRate[];
}

export function RatesList({ rates }: RatesListProps) {
  const getCurrencyImagePath = (currency: string) => {
    const currencyData = supportedCurrencies.find(({ name }) => name === currency);
    return currencyData ? currencyData.path : '';
  }
  return (
    <div>
      <ul className="rates-list">
        {rates.map((rate) => (
          <li key={rate.currency}>
            <span className="rate">{<b>{rate.rate}</b>}</span>
            <div>
              <img src={getCurrencyImagePath(rate.currency)} alt={rate.currency} style={{ width: '20px', marginRight: '8px' }} />
              <span className="currency">{<b>{rate.currency}</b>}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatesList;