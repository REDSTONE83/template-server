var express = require('express');
var router = express.Router();

const range = function (start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
};

const dummyObj = function () {
  return {
    firstname: NAMES[Math.floor(Math.random() * 3)],
    lastname: NAMES[Math.floor(Math.random() * 3)],
    age: String(Math.floor(Math.random() * 50)),
    gender: GENDER[Math.floor(Math.random() * 2)],
    email: '',
    address: '',
    nation: '',
    phone: '',
    salary: '',
    department: '',
    nickname: '',
    ...range(1, 100, 1).reduce((acc, val, idx) => {
      acc[`column${idx}`] = '';
      return acc;
    }, {}),
  };
};

const NAMES = ['Kim', 'Lee', 'Park', 'Kang', 'Seo'];
const GENDER = ['M', 'F'];

const n = 100000;
const arr = new Array(n);
const dummyTemplate = new Array(10000);
for (let i = 0; i < 10000; i++) {
  dummyTemplate[i] = dummyObj();
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  const rand = Math.floor(Math.random() * 9999);
  for (let i = 0; i < n; i++) {
    arr[i] = dummyTemplate[(i + rand) % 10000];
  }
  res.status(200).json({
    users: arr,
  });
});

module.exports = router;
