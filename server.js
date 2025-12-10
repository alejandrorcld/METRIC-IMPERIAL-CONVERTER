'use strict';

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const ConvertHandler = require('./controllers/convertHandler');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const convertHandler = new ConvertHandler();

// Rutas del proyecto
app.get('/api/convert', (req, res) => {
  const input = req.query.input;
  if (!input || typeof input !== 'string') {
    return res.status(200).json('invalid number and unit'); // comportamiento FCC
  }

  const num = convertHandler.getNum(input);
  const unit = convertHandler.getUnit(input);

  if (num === null && unit === null) return res.status(200).json('invalid number and unit');
  if (num === null) return res.status(200).json('invalid number');
  if (unit === null) return res.status(200).json('invalid unit');

  const returnUnit = convertHandler.getReturnUnit(unit);
  const returnNum = convertHandler.convert(num, unit);
  const string = convertHandler.getString(num, unit, returnNum, returnUnit);

  return res.status(200).json({
    initNum: num,
    initUnit: unit,
    returnNum,
    returnUnit,
    string
  });
});

// Endpoint requerido por el evaluador FCC para los checks 12 y 13
app.get('/_api/get-tests', (req, res) => {
  const filePath = path.join(__dirname, 'tests.js');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Si no se encuentra tests.js, respondemos 500 para detectar el problema
      return res.status(500).send('Error loading tests.js');
    }
    res.type('application/javascript').send(data);
  });
});

// Salud (opcional)
app.get('/', (req, res) => {
  res.status(200).send('Metric-Imperial Converter API is live.');
});

// Puerto para Render / local
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
