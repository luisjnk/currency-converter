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
  errorMessage: string | null;
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
    supportedCurrencies.some(currency => currency.name === getCurrencyCode(pair, baseCurrency))
  );
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

function getCacheKey(baseCurrency: string): string {
  return `exchangeRates_${baseCurrency}`;
}

function getCachedRates(baseCurrency: string): { rates: ExchangeRate[], timestamp: number } | null {
  const cacheKey = getCacheKey(baseCurrency);
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
}

function setCachedRates(baseCurrency: string, rates: ExchangeRate[]): void {
  const cacheKey = getCacheKey(baseCurrency);
  const timestamp = new Date().getTime();
  localStorage.setItem(cacheKey, JSON.stringify({ rates, timestamp }));
}

function isCacheExpired(timestamp: number): boolean {
  const currentTime = new Date().getTime();
  const oneHour = 60 * 60 * 1000;
  return currentTime - timestamp >= oneHour;
}

export function useExchangeRates(baseCurrency: string, amount: number): UseExchangeRatesResult {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const cachedData = getCachedRates(baseCurrency);
    if (cachedData && !isCacheExpired(cachedData.timestamp)) {
      setRates(cachedData.rates);
      return;
    } else if (cachedData) {
      localStorage.removeItem(getCacheKey(baseCurrency));
    }

    const updateRates = async () => {
      try {
        setIsLoading(true);
        const currencyRates = await sdk.getTicker(baseCurrency);
        const rates = getRatesByBaseCurrency(currencyRates, baseCurrency);
        setRates(rates);
        setCachedRates(baseCurrency, rates);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsError(true);
        setErrorMessage('An error occurred while fetching exchange rates.');
        setIsLoading(false);
      }
    };

    if (amount > 0) {
      updateRates();
    }
  }, [baseCurrency, amount]);

  return { rates, isError, isLoading, errorMessage };
}