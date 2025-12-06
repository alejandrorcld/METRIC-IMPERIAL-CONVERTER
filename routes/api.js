const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  const convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input || '';
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === null && initUnit === null) return res.json('invalid number and unit');
    if (initNum === null) return res.json('invalid number');
    if (initUnit === null) return res.json('invalid unit');

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const rawReturnNum = convertHandler.convert(initNum, initUnit);
    const returnNum =  Number(rawReturnNum.toFixed(5));
    const string = convertHandler.getString(initNum, rawReturnNum, initUnit, returnUnit);

    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
