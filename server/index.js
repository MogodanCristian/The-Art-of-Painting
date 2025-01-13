const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const cors = require('cors')

//import routes
const authRoute = require('./routes/auth')
const paintingRoute = require('./routes/paintings')

dotenv.config();

//connect to DB
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.error('Error connecting to DB:', error);
  });

//Middlewares
app.use(cors())
app.use(bodyparser.json());


app.use('/api/auth', authRoute)
app.use('/api/paintings', paintingRoute)

app.listen(8080, () =>
{
    console.log('Server running');
})