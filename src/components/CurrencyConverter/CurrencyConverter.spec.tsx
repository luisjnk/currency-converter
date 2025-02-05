import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencyConverter } from './CurrencyConverter';

const mockSupportedCurrencies = [
  { name: 'USD', path: '/path/to/usd-icon.svg' },
  { name: 'EUR', path: '/path/to/eur-icon.svg' },
];

test('renders CurrencyConverter component', () => {
  render(
    <CurrencyConverter
      amount={1000}
      selectedCurrency="USD"
      handleAmountChange={jest.fn()}
      handleCurrencyChange={jest.fn()}
    />
  );
  const inputElement = screen.getByPlaceholderText(/0.00/i);
  const selectedCurrencyElement = screen.getByText(/USD/i);
  expect(inputElement).toBeInTheDocument();
  expect(selectedCurrencyElement).toBeInTheDocument();
});

test('calls handleCurrencyChange on currency option click', () => {
  const handleCurrencyChange = jest.fn();
  render(
    <CurrencyConverter
      amount={1000}
      selectedCurrency="USD"
      handleAmountChange={jest.fn()}
      handleCurrencyChange={handleCurrencyChange}
    />
  );
  const selectedCurrencyElement = screen.getByText(/USD/i);
  fireEvent.click(selectedCurrencyElement);
  const currencyOptionElement = screen.getByText(/EUR/i);
  fireEvent.click(currencyOptionElement);
  expect(handleCurrencyChange).toHaveBeenCalledWith('EUR');
});
