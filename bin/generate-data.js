const fs = require('fs');
const path = require('path');
const faker = require('faker');
const uniqueId = require('lodash/uniqueId');

const destination = path.join(__dirname, '..', 'src', 'data.json');

const data = [];

for (let i = 0; i < 1000; i++) {
  const item = {
    id: uniqueId(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    company: faker.company.companyName(),
    department: faker.commerce.department(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    date: faker.date.recent(),
  };

  data.push(item);
}

fs.writeFileSync(destination, JSON.stringify(data));