const { create } = require('domain');
const faker = require('faker');
const fs = require('fs');
const { prependListener } = require('process');

// Set language = Viet Nam
faker.locale = 'vi';

const RandomLopdata = (n) => {
  if (n <= 0) return [];
  const lopsdata = [];
  Array.from(new Array(n)).forEach(() => {
    const Lopdata = {
      id: faker.datatype.uuid(),
      name: faker.address.cityName(),
      createAt: faker.date.past(),
      end: faker.date.recent()
    };
    lopsdata.push(Lopdata);
  });
  return lopsdata;
};

const RandomUserdata = (numberlop, numberUser) => {
  if (numberUser <= 0) return [];
  const userlist = [];
  for (const lop of numberlop) {
    Array.from(new Array(numberUser)).forEach(() => {
      const user = {
        lop: lop.id,
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        qrcode: faker.datatype.number(),
        phone: faker.phone.phoneNumber(),
        createAt: Date.now(),
        updateAt: Date.now(),
      };
      userlist.push(user);
    });
  }
  return userlist;
};

(() => {
  //random data
  const lopsdata = RandomLopdata(10);
  const userdata = RandomUserdata(lopsdata, 5);

  //prepare db
  const db = {
    lop: lopsdata,
    user: userdata,
  };
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('add data thanh cong');
  });
})();
