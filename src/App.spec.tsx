import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { useExchangeRates } from './hooks';

jest.mock('./hooks');

const mockUseExchangeRates = useExchangeRates as jest.MockedFunction<typeof useExchangeRates>;

const mockRates = [
	{ currency: 'EUR', rate: '1.2' },
	{ currency: 'USD', rate: '0.8333333333333334' },
];

describe('App', () => {
	beforeEach(() => {
		mockUseExchangeRates.mockClear();
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
		expect(screen.getByText(/Receive competitive and transparent pricing/i)).toBeInTheDocument();
	});

	test('displays loading state', () => {
		mockUseExchangeRates.mockReturnValue({
			rates: null,
			isLoading: true,
			isError: false,
			errorMessage: null,
		});

		render(<App />);

		expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
	});

	test('displays error state', () => {
		mockUseExchangeRates.mockReturnValue({
			rates: null,
			isLoading: false,
			isError: true,
			errorMessage: 'An error occurred while fetching exchange rates.',
		});

		render(<App />);

		expect(screen.getByText(/An error occurred while fetching exchange rates./i)).toBeInTheDocument();
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
			expect(inputElement).toHaveValue('2.000');
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

	test('renders RatesList when amount is greater than 0', () => {
		mockUseExchangeRates.mockReturnValue({
			rates: mockRates,
			isLoading: false,
			isError: false,
			errorMessage: null,
		});

		render(<App />);

		const inputElement = screen.getByPlaceholderText(/0.00/i);
		fireEvent.change(inputElement, { target: { value: '2000' } });

		expect(screen.getByText(/EUR: 1.2/i)).toBeInTheDocument();
		expect(screen.getByText(/USD: 0.8333333333333334/i)).toBeInTheDocument();
	});
});