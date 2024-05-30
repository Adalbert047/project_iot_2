const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const tempRoutes = require('./routes/TempRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api', tempRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: http://localhost:${PORT}`); 
  });
}).catch(err => {
  console.log('No se pudo conectar a la base de datos', err);
});
