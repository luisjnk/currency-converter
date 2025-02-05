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
    name: 'AUD',
    path: `${publicUrl}/assets/AUD.png`
  },
  {
    name: 'BRL',
    path: `${publicUrl}/assets/BRL.png`
  },
  {
    name: 'BCH',
    path: `${publicUrl}/assets/BCH.png`
  },
  {
    name: 'BTG',
    path: `${publicUrl}/assets/BTG.png`
  },
  {
    name: 'NZD',
    path: `${publicUrl}/assets/NZD.png`
  },
  {
    name: 'CHF',
    path: `${publicUrl}/assets/CHF.png`
  },
  {
    name: 'NOK',
    path: `${publicUrl}/assets/NOK.png`
  },
  {
    name: 'MXN',
    path: `${publicUrl}/assets/MXN.png`
  },
  {
    name: 'JPY',
    path: `${publicUrl}/assets/JPY.png`
  },
  {
    name: 'ETH',
    path: `${publicUrl}/assets/ETH.png`
  },
  {
    name: 'HKD',
    path: `${publicUrl}/assets/HKD.png`
  },
  {
    name: 'DKK',
    path: `${publicUrl}/assets/DKK.png`
  },
  {
    name: 'CNY',
    path: `${publicUrl}/assets/CNY.png`
  },
  {
    name: 'CAD',
    path: `${publicUrl}/assets/CAD.png`
  },
  {
    name: 'ILS',
    path: `${publicUrl}/assets/ILS.png`
  },
  {
    name: 'KES',
    path: `${publicUrl}/assets/KES.png`
  }
];