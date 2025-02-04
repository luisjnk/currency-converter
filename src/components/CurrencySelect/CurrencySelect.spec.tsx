import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencySelect } from './CurrencySelect';

const mockSupportedCurrencies = [
  { name: 'USD', path: '/path/to/usd-icon.svg' },
  { name: 'EUR', path: '/path/to/eur-icon.svg' },
];

test('renders CurrencySelect component', () => {
  render(
    <CurrencySelect
      supportedCurrencies={mockSupportedCurrencies}
      selectedCurrency="USD"
      handleCurrencyChange={jest.fn()}
    />
  );
  const selectedCurrencyElement = screen.getByText(/USD/i);
  expect(selectedCurrencyElement).toBeInTheDocument();
});

test('toggles currency options on click', () => {
  render(
    <CurrencySelect
      supportedCurrencies={mockSupportedCurrencies}
      selectedCurrency="USD"
      handleCurrencyChange={jest.fn()}
    />
  );
  const selectedCurrencyElement = screen.getByText(/USD/i);
  fireEvent.click(selectedCurrencyElement);
  const currencyOptions = screen.getByText(/EUR/i);
  expect(currencyOptions).toBeInTheDocument();
});

test('calls handleCurrencyChange on currency option click', () => {
  const handleCurrencyChange = jest.fn();
  render(
    <CurrencySelect
      supportedCurrencies={mockSupportedCurrencies}
      selectedCurrency="USD"
      handleCurrencyChange={handleCurrencyChange}
    />
  );
  const selectedCurrencyElement = screen.getByText(/USD/i);
  fireEvent.click(selectedCurrencyElement);
  const currencyOptionElement = screen.getByText(/EUR/i);
  fireEvent.click(currencyOptionElement);
  expect(handleCurrencyChange).toHaveBeenCalledWith('EUR');
});

test('renders dropdown icon', () => {
  render(
    <CurrencySelect
      supportedCurrencies={mockSupportedCurrencies}
      selectedCurrency="USD"
      handleCurrencyChange={jest.fn()}
    />
  );
  const dropdownIcon = screen.getByAltText(/Dropdown Icon/i);
  expect(dropdownIcon).toBeInTheDocument();
});