# Currency Converter

This project is a Currency Converter application built with React and TypeScript. It allows users to convert amounts between different currencies using real-time exchange rates fetched from the Uphold API.


## Technologies Used

- React
- TypeScript
- CSS
- Jest and React Testing Library for testing
- Prettier for code formatting

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/currency-converter.git
   cd currency-converter

2. Install dependencies
    ```
    npm install
    ```

## Usage

1. Start the development server:
  ```
    npm start
```

## Scripts

| Command  | Right columns |
| ------------- |:-------------:|
| npm start      | Starts the development server|
| npm test     |  Runs the test suite    |
| npm run build      | Builds the application for production    |
| npm run prettier      | Formats the code using Prettier    |
| npm run prettier      | Formats the npm run prettier:checkr    | Checks the code formatting using Prettie

## Acceptance criteria

- [X] **TC01:** The user input amount should be USD by default.
- [X] **TC02:** Should be able to change between currencies.
- [X] **TC03:** Should update the values for every currency on user interaction using a
debounce mechanism.
- [X] **TC04:** Should have all the values cached upon the first request.
- [X] **TC05:** Should make a new API call in the background, re-populating the cached value,
when changing between currencies.