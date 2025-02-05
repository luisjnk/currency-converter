import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CurrencyInput } from './CurrencyInput';

test('renders CurrencyInput component', () => {
    render(<CurrencyInput amount={1000} handleAmountChange={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText(/0.00/i);
    expect(inputElement).toBeInTheDocument();
});

test('calls handleAmountChange on input change', async () => {
    const handleAmountChange = jest.fn();
    render(<CurrencyInput amount={1000} handleAmountChange={handleAmountChange} />);
    const inputElement = screen.getByTestId('currency-input');
    fireEvent.change(inputElement, { target: { value: '2000' } });

    await waitFor(() => {
        expect(inputElement).toHaveValue('2,000');
    });
});