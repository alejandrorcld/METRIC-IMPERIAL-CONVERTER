// server.js
'use strict';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// habilitar CORS para todos los orígenes, incluso 'null'
app.use(cors({
  origin: (origin, callback) => {
    // aceptar siempre, incluso si origin es null
    callback(null, true);
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rutas
require('./routes/api.js')(app);

// raíz
app.get('/', (req, res) => {
  res.send('Metric-Imperial Converter API');
});

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

module.exports = app;
