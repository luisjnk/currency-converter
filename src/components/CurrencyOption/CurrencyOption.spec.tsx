import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencyOption } from './CurrencyOption';

const mockCurrency = {
  name: 'USD',
  path: '/path/to/usd-icon.svg',
};

test('renders CurrencyOption component', () => {
  render(
    <CurrencyOption currency={mockCurrency} handleCurrencyChange={jest.fn()} />
  );
  const currencyElement = screen.getByText(/USD/i);
  expect(currencyElement).toBeInTheDocument();
});

test('calls handleCurrencyChange on click', () => {
  const handleCurrencyChange = jest.fn();
  render(
    <CurrencyOption
      currency={mockCurrency}
      handleCurrencyChange={handleCurrencyChange}
    />
  );
  const currencyElement = screen.getByText(/USD/i);
  fireEvent.click(currencyElement);
  expect(handleCurrencyChange).toHaveBeenCalledWith('USD');
});

test('renders currency icon', () => {
  render(
    <CurrencyOption currency={mockCurrency} handleCurrencyChange={jest.fn()} />
  );
  const iconElement = screen.getByAltText(/USD/i);
  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveAttribute('src', '/path/to/usd-icon.svg');
});
