// generateTransactions.js
import { faker } from '@faker-js/faker';
import fs from 'fs';

// SETTINGS
const NUM_TRANSACTIONS = 100;
const START_DATE = new Date('2025-06-01');
const END_DATE = new Date('2025-06-30');

const userIds = [1, 2, 3];

const categories = [
  'Groceries',
  'Food & Beverages',
  'Shopping',
  'Utilities',
  'Transportation',
  'Rent'
];

// 1️⃣ Generate dates
const dates = Array.from({ length: NUM_TRANSACTIONS }, () =>
  faker.date.between({ from: START_DATE, to: END_DATE })
);

// 2️⃣ Sort ascending
dates.sort((a, b) => a - b);

// 3️⃣ Create transactions
const transactions = dates.map(date => {
  const category = faker.helpers.arrayElement(categories);

  const amount = (() => {
    switch (category) {
      case 'Rent': return faker.number.float({ min: 500, max: 2500, precision: 0.01 });
      case 'Utilities': return faker.number.float({ min: 50, max: 200, precision: 0.01 });
      case 'Transportation': return faker.number.float({ min: 5, max: 100, precision: 0.01 });
      default: return faker.number.float({ min: 5, max: 200, precision: 0.01 });
    }
  })();

  return {
    _id: { $oid: faker.database.mongodbObjectId() },
    userId: faker.helpers.arrayElement(userIds),
    name: `${faker.company.name()} - ${faker.commerce.productName()}`,
    amount: Number(amount.toFixed(2)), // ensure 2 decimals
    category,
    date: date.toISOString().split('T')[0] // YYYY-MM-DD
  };
});

// 4️⃣ Write to file
fs.writeFileSync('transactions.json', JSON.stringify(transactions, null, 2));
console.log(`✅ Generated ${NUM_TRANSACTIONS} transactions with ascending dates`);