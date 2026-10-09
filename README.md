# বাজার দর (Bazar Dor)

বাজার দর is a web application that helps people in Bangladesh check the prices of everyday grocery products in one place.

## Features

* View grocery products and their current prices.
* Browse products by category.
* See which products have increased or decreased in price.
* Sort products from low to high or high to low.
* View product price history and market-wise prices.
* Create an account and sign in with email or social accounts.
* Update profile information.
* View product details after signing in.
* Use the website on mobile, tablet, and desktop.

## Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* Better Auth
* PostgreSQL
* React Hot Toast

## Getting Started

First, install the dependencies:

npm install


Create a `.env.local` file in the root directory and add the required database and authentication environment variables.

Run the development server:
npm run dev


Open http://localhost:3000 in your browser.

## Build

To check the production build, run:


npm run build


## API

Product and category data are fetched from the Bazar Dor API:

https://api.abcz.workers.dev/api/bazardor

# Note

Product prices may vary depending on the market. Environment variables and database configuration are required for authentication to work.
