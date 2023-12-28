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
    console.log(`API is running on port ${process.env.API_PORT}`);
})

// Export the Express API
module.exports = app;