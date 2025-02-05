import React, { useState } from 'react';
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
  const [visibleCount, setVisibleCount] = useState(10);

  const getCurrencyImagePath = (currency: string) => {
    const currencyData = supportedCurrencies.find(({ name }) => name === currency);
    return currencyData ? currencyData.path : '';
  }
  const handleShowMore = () => {
    setVisibleCount(visibleCount + 20);
  };

  return (
    <div className="rates-list">
      <ul>
        {rates.slice(0, visibleCount).map((rate) => (
          <li className='rate-item-content' key={rate.currency}>
            <span className="rate-item-currency font-weight-bold">
              {(amount * parseFloat(rate.rate)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div>
              <img src={getCurrencyImagePath(rate.currency)} alt={rate.currency} />
              <span className="rate-item-currency">{rate.currency}</span>
            </div>
          </li>
        ))}
      </ul>
      {visibleCount < rates.length && (
        <button onClick={handleShowMore} className="show-more-button">
          Show More
        </button>
      )}
    </div>

  );
};
