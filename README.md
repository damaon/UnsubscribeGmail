# How to use

Install Node.js - https://nodejs.org/en/

Then in this directory, run `npm install`

Just make sure nothing got hacked in meantime with `npm audit`

Fill your gmail credentials in `credentials.json`

The password shouldn't be your real gmail password but one generated via https://myaccount.google.com/apppasswords (Mac) otherwise you'll get `Error: Application-specific password required`

Run with something like this: `npm run script -- "2022-01-01"`

Date is since when it should read unread messages (default is 2022-01-01)
