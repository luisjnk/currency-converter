import SDK from '@uphold/uphold-sdk-javascript';
import { useEffect, useState } from 'react';
import { supportedCurrencies } from '../../utils/supportedCurrencies';

interface ExchangeRate {
  rate: string;
  currency: string;
}

interface CurrencyRate {
  ask: string;
  bid: string;
  currency: string;
  pair: string;
}

interface UseExchangeRatesResult {
  rates: ExchangeRate[] | null;
  isError: boolean;
  isLoading: boolean;
}

const sdk = new SDK({
  baseUrl: 'http://api-sandbox.uphold.com',
  clientId: 'foo',
  clientSecret: 'bar',
});

function getCurrencyCode(pair: string, base: string): string {
  return pair.replace(base, '').replace('-', '');
}

function filterSupportedPairs(currencyRates: CurrencyRate[], baseCurrency: string): CurrencyRate[] {
  return currencyRates.filter(({ pair }) =>
    supportedCurrencies
      .some(currency => currency.name === getCurrencyCode(pair, baseCurrency) ))
}

function removeDuplicatePairs(supportedPairs: CurrencyRate[], baseCurrency: string): CurrencyRate[] {
  const selectedPairs: { [key: string]: boolean } = {};
  return supportedPairs.filter(({ pair }) => {
    const key = getCurrencyCode(pair, baseCurrency);
    if (selectedPairs[key]) return false;
    selectedPairs[key] = true;
    return true;
  });
}

function convertPairsToRates(uniquePairs: CurrencyRate[], baseCurrency: string): ExchangeRate[] {
  return uniquePairs.map(({ ask, currency, pair }): ExchangeRate => {
    const rate = currency === baseCurrency
      ? (1 / Number.parseFloat(ask)).toString()
      : ask;
    return {
      rate,
      currency: getCurrencyCode(pair, baseCurrency),
    };
  });
}

function getRatesByBaseCurrency(currencyRates: CurrencyRate[], baseCurrency: string): ExchangeRate[] {
  const supportedPairs = filterSupportedPairs(currencyRates, baseCurrency);
  const uniquePairs = removeDuplicatePairs(supportedPairs, baseCurrency);
  return convertPairsToRates(uniquePairs, baseCurrency);
}


export function useExchangeRates(baseCurrency: string, amount: number): UseExchangeRatesResult {  
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cachedRates = localStorage.getItem(`exchangeRates_${baseCurrency}`);
    if (cachedRates) {
      setRates(JSON.parse(cachedRates));
      return;
    }

    const updateRates = async () => {
      try {
        setIsLoading(true);
        const currencyRates = await sdk.getTicker(baseCurrency);
        const rates = getRatesByBaseCurrency(currencyRates, baseCurrency);
        setRates(rates);
        localStorage.setItem(`exchangeRates_${baseCurrency}`, JSON.stringify(rates));
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    updateRates();
  }, [baseCurrency, setRates, amount, setIsError, setIsLoading]);

  return {rates, isError, isLoading};
}