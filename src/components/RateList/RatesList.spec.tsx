import React from 'react';
import { render, screen } from '@testing-library/react';
import { RatesList } from './RatesList';

const mockSupportedCurrencies = [
  { name: 'USD', path: '/path/to/usd-icon.svg' },
  { name: 'EUR', path: '/path/to/eur-icon.svg' },
];

jest.mock('../../utils/supportedCurrencies', () => ({
  supportedCurrencies: [
    { name: 'USD', path: '/path/to/usd-icon.svg' },
    { name: 'EUR', path: '/path/to/eur-icon.svg' },
  ],
}));

const mockRates = [
  { currency: 'USD', rate: '1.2' },
  { currency: 'EUR', rate: '0.9' },
];

test('renders RatesList component', () => {
  render(<RatesList rates={mockRates} amount={1000} />);
  const usdElement = screen.getByText(/USD/i);
  const eurElement = screen.getByText(/EUR/i);
  expect(usdElement).toBeInTheDocument();
  expect(eurElement).toBeInTheDocument();
});

test('displays correct converted amounts', () => {
  render(<RatesList rates={mockRates} amount={1000} />);
  const usdAmount = screen.getByText('1,200.00');
  const eurAmount = screen.getByText('900.00');
  expect(usdAmount).toBeInTheDocument();
  expect(eurAmount).toBeInTheDocument();
});

test('renders currency icons', () => {
  render(<RatesList rates={mockRates} amount={1000} />);
  const usdIcon = screen.getByAltText(/USD/i);
  const eurIcon = screen.getByAltText(/EUR/i);
  expect(usdIcon).toBeInTheDocument();
  expect(usdIcon).toHaveAttribute('src', '/path/to/usd-icon.svg');
  expect(eurIcon).toBeInTheDocument();
  expect(eurIcon).toHaveAttribute('src', '/path/to/eur-icon.svg');
});