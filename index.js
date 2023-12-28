const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();


// Routes
const AuthRouter = require('./src/routers/auth')
const DayRouter = require('./src/routers/day')
const SuiteRouter = require('./src/routers/suite')
const WordRouter = require('./src/routers/word')

app.use(cors()); // avoid cors errors
app.use(express.json());

//Front end
app.use(express.static(path.join(__dirname, 'public'))); 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// routers
app.use('/auth', AuthRouter);
app.use('/day/word', DayRouter);
app.use('/day/suite', SuiteRouter);
app.use('/words/', WordRouter);


// Putting the API on port 3000
app.listen(process.env.API_PORT || 3000, () => {
    console.log('------');
    console.log('\x1B[45m Welcome to \x1B[1m French Words API v1 ! \x1b[0m  ');
    console.log(`API is running on port \x1B[42m\x1B[31m ${process.env.API_PORT} \x1B[0m \x1B[0m `);
    console.log('------');
})

// Export the Express API
module.exports = app;