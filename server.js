const express = require('express');
const cors = require('cors');
const app = express();

// habilitar CORS para todos los orígenes, incluyendo 'null'
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === 'null') {
      // aceptar peticiones sin origen o con origen 'null'
      callback(null, true);
    } else {
      callback(null, true); // aceptar cualquier otro origen también
    }
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rutas
require('./routes/api.js')(app);

app.get('/', (req, res) => {
  res.send('Metric-Imperial Converter API');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));

module.exports = app;
