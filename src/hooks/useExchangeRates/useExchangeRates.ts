import SDK from '@uphold/uphold-sdk-javascript';
import { useEffect, useState } from 'react';
import { supportedCurrencies } from '../../utils/supportedCurrencies';

const sdk = new SDK({
  baseUrl: 'http://api-sandbox.uphold.com',
  clientId: 'foo',
  clientSecret: 'bar',
});

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

function geRatesByBaseCurrency(currencyRates: CurrencyRate[], baseCurrency: string): ExchangeRate[] {
  const supportedPairs = filterSupportedPairs(currencyRates, baseCurrency);
  const uniquePairs = removeDuplicatePairs(supportedPairs, baseCurrency);
  return convertPairsToRates(uniquePairs, baseCurrency);
}

export function useExchangeRates(baseCurrency: string, amount: number): ExchangeRate[] {  
  const [rates, setRates] = useState<ExchangeRate[]>(null);

  useEffect(() => {
    const updateRates = async () =>{
      try {
        const currencyRates = await sdk.getTicker(baseCurrency);
        setRates(geRatesByBaseCurrency(currencyRates, baseCurrency))
      } catch (err) {
        console.log(err);
      }
    }

    if(amount > 0) updateRates();
  }, [baseCurrency, setRates, amount]);

  return rates;
}