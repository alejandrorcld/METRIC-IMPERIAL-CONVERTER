const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api.js');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta que FCC usa para leer los tests
app.get('/_api/get-tests', (req, res) => {
  res.sendFile(path.join(__dirname, 'test', 'tests.js'));
});

apiRoutes(app);

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

module.exports = app;
