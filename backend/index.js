require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000;
const cors = require('cors');

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());



app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })