const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const cors = require('cors')

//import routes
const authRoute = require('./routes/auth')

dotenv.config();

console.log(process.env.DB_CONNECTION)

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
app.use(bodyparser.json());
app.use(cors())

app.use('/api/auth', authRoute)

app.listen(3000, () =>
{
    console.log('Server running');
})