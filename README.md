# stopover-search-app

Another take-home assignment for a software engineer position from a very nice company.

## Tech Challenge

> Build a simple server that, given a city code (eg, PAR), check-in date, and check-out date, will return the three cheapest hotel rooms. Make sure your output only contains the required information, the name of the hotel, address, phone number, and the rate for a room.
>
> Use the [amadeus for Developers](https://developers.amadeus.com/self-service/category/207/api-doc/11) api.

## Technology used

- Node.js, Express
- React, Hooks, Bootstrap
- Jest/Enzyme
- webpack

## UI Preview

![ui](https://www.dropbox.com/s/8bkmgxaxtbw17c4/Screenshot%202019-03-11%2005.00.47.png?raw=1)

## Start Instructions

1. Clone this repo
2. Duplicate `.env.defaults` into `.env`
3. Edit `.env` file to setup project. Make sure to provide [Amadeus keys](https://developers.amadeus.com/quick-start-guide/category?id=77&durl=335)
4. Install deps: `npm install`
5. Build project: `npm run build`
6. Start the app: `npm start`

## Scripts
```bash
npm start # starts a web server. make sure to `build` beforehand to serve static
npm run build # compiles web-client into `build/public`
npm run watch # starts a dev server and opens browser
npm run test # runs test suits
npm run coverage # outputs coverage report
```
