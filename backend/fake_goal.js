const { faker } = require('@faker-js/faker');
const fs = require('fs');

const userIds = [1, 2, 3, 4];

const goals = Array.from({ length: 10 }, () => {
  const goalAmount = faker.number.int({ min: 1000, max: 20000 });
  const amount = faker.number.float({ min: 0, max: goalAmount, precision: 0.01 });
  const status = amount >= goalAmount ? 'Completed' : 'In Progress';

  return {
    userId: faker.helpers.arrayElement(userIds),
    title: faker.lorem.words(2),
    description: faker.lorem.sentence(),
    status,
    amount,
    goalAmount,
  };
});

fs.writeFileSync('goals.json', JSON.stringify(goals, null, 2));
