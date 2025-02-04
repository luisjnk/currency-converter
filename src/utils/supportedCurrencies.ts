export interface Currency {
  name: string;
  path: string;
}

const publicUrl = process.env.PUBLIC_URL || '';

export const supportedCurrencies: Currency[] = [
  {
    name: 'USD',
    path: `${publicUrl}/assets/USD.png`
  },
  {
    name: 'EUR',
    path: `${publicUrl}/assets/EUR.png`
  },
  {
    name: 'GBP',
    path: `${publicUrl}/assets/GBP.png`
  },
  {
    name: 'BRL',
    path: `${publicUrl}/assets/BRL.png`
  }
];