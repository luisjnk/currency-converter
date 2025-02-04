import { SupportedCurrency } from './commomTypes'

export const supportedCurrencies: SupportedCurrency[] = [
  {
    name: 'USD',
    path: process.env.PUBLIC_URL + '/assets/USD.png'
  },
  {
    name: 'EUR',
    path: process.env.PUBLIC_URL + '/assets/EUR.png'
  },
  {
    name: 'GBP',
    path: process.env.PUBLIC_URL + '/assets/GBP.png'
  },
  {
    name: 'BRL',
    path: process.env.PUBLIC_URL + '/assets/BRL.png'
  }
]