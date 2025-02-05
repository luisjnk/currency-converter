import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { useExchangeRates } from './hooks';
import SDK from '@uphold/uphold-sdk-javascript';

jest.mock('./hooks');
jest.mock('@uphold/uphold-sdk-javascript');

const mockUseExchangeRates = useExchangeRates as jest.MockedFunction<
  typeof useExchangeRates
>;

const mockRates = [
  { currency: 'EUR', rate: '1.2' },
  { currency: 'USD', rate: '0.8333333333333334' },
];

const mockCurrencyRates = [
  { ask: '1.2', bid: '1.1', currency: 'USD', pair: 'USD-EUR' },
  { ask: '0.9', bid: '0.8', currency: 'EUR', pair: 'EUR-USD' },
];

const mockSDK = {
  getTicker: jest.fn(),
};

SDK.mockImplementation(() => mockSDK);

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    mockSDK.getTicker.mockReset();
  });

  test('renders App component', () => {
    mockUseExchangeRates.mockReturnValue({
      rates: mockRates,
      isLoading: false,
      isError: false,
      errorMessage: null,
    });

    render(<App />);

    expect(screen.getByText(/Currency Converter/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Receive competitive and transparent pricing/i)
    ).toBeInTheDocument();
  });

  test('displays loading state', () => {
    mockUseExchangeRates.mockReturnValue({
      rates: null,
      isLoading: true,
      isError: false,
      errorMessage: null,
    });

    render(<App />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('displays error state', () => {
    mockUseExchangeRates.mockReturnValue({
      rates: null,
      isLoading: false,
      isError: true,
      errorMessage: 'An error occurred while fetching exchange rates.',
    });

    render(<App />);

    expect(
      screen.getByText(/An error occurred while fetching exchange rates./i)
    ).toBeInTheDocument();
  });

  test('updates amount on input change', async () => {
    mockUseExchangeRates.mockReturnValue({
      rates: mockRates,
      isLoading: false,
      isError: false,
      errorMessage: null,
    });

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/0.00/i);
    fireEvent.change(inputElement, { target: { value: '2000' } });

    await waitFor(() => {
      expect(inputElement).toHaveValue('2,000');
    });
  });

  test('updates selected currency on currency change', async () => {
    mockUseExchangeRates.mockReturnValue({
      rates: mockRates,
      isLoading: false,
      isError: false,
      errorMessage: null,
    });

    render(<App />);

    const selectedCurrencyElement = screen.getByText(/USD/i);
    fireEvent.click(selectedCurrencyElement);
    const currencyOptionElement = screen.getByText(/EUR/i);
    fireEvent.click(currencyOptionElement);

    await waitFor(() => {
      expect(screen.getByText(/EUR/i)).toBeInTheDocument();
    });
  });

  test('renders RatesList when amount is greater than 0', async () => {
    mockUseExchangeRates.mockReturnValue({
      rates: mockRates,
      isLoading: false,
      isError: false,
      errorMessage: null,
    });

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/0.00/i);
    fireEvent.change(inputElement, { target: { value: '2000' } });

    await waitFor(() => {
      expect(screen.getByText(/2,400.00/i)).toBeInTheDocument();
    });
  });

  test('fetches and displays exchange rates', async () => {
    mockSDK.getTicker.mockResolvedValue(mockCurrencyRates);

    render(<App />);
    const inputElement = screen.getByPlaceholderText(/0.00/i);
    fireEvent.change(inputElement, { target: { value: '2000' } });

    await waitFor(() => {
      expect(screen.getByText(/2,400.00/i)).toBeInTheDocument();
    });
  });
});
