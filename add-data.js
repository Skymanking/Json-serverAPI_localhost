const { create } = require('domain');
const faker = require('faker');
const fs = require('fs');
const { prependListener } = require('process');

// Set language = Viet Nam
faker.locale = 'vi';

const RandomUserdata = (n) => {
  if (n <= 0) return [];
  const usersdata = [];
  Array.from(new Array(n)).forEach(() => {
    const Userdata = {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    usersdata.push(Userdata);
  });
  return usersdata;
};

const RandomProductdata = (numberUser, numberProduct) => {
  if (numberProduct <= 0) return [];
  const productlist = [];
  for (const user of numberUser) {
    Array.from(new Array(numberProduct)).forEach(() => {
      const product = {
        user: user.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createAt: Date.now(),
        updateAt: Date.now(),
      };
      productlist.push(product);
    });
  }
  return productlist;
};

(() => {
  //random data
  const usersdata = RandomUserdata(10);
  const productdata = RandomProductdata(usersdata, 5);

  //prepare db
  const db = {
    user: usersdata,
    product: productdata,
  };
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('add data thanh cong');
  });
})();
