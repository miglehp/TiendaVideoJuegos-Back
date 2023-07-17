const express = require('express');
const { router } = require('./routes/api');
const cors = require('cors');

const app = express();

app.use(cors(), express.json());

app.use((req, res, next)=>{
    console.log(new Date());
    next();
})

app.use('/api', router);

module.exports = { app };