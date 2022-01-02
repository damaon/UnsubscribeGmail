# What it is?

Tool to unsubscribe you from all spam emails you might be getting (and more).
It basically unsubsribes from anything that can be unsubscribed but can be easily adjusted.

# Why one would need it? 

If you have too many emails spam emails and don't have patience to unsubscribe manually.

This code is simple and easy to audit for anyone, see for yourself - [script.js](./script.js)

# How to use

Install Node.js - https://nodejs.org/en/

Then in this directory, run `npm install`

Just make sure all code is secure with `npm audit`

Fill your gmail credentials in `credentials.json`

⚠️ The password shouldn't be your real gmail password but one generated via https://myaccount.google.com/apppasswords (Mac) otherwise you'll get `Error: Application-specific password required`

Run like that: `npm run script -- "2022-01-01"`

Date is since when it should read unread messages (default is 2022-01-01)
