const prompt = require('prompt-sync')();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI);

const CRM = require('./models/CRM.js')






const username = prompt('What is your name?');

console.log(`Your name is ${username}.`);
