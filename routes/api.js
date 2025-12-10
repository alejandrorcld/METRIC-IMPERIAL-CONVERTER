// routes/api.js
'use strict';
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    const invalidNum = initNum === null;
    const invalidUnit = initUnit === null;

    if (invalidNum && invalidUnit) return res.send('invalid number and unit');
    if (invalidNum) return res.send('invalid number');
    if (invalidUnit) return res.send('invalid unit');

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
