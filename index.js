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
app.use('/day', DayRouter);
app.use('/suite', SuiteRouter);
app.use('/words/', WordRouter);


// test Supabase
app.get('/supabase', async (req, res) => {
    try {
        let supabase = new SupaBaseRepository(process.env.SUPABASE_URL,process.env.SUPABASE_KEY)
        let day = await supabase.getDay()
        console.log("get day : "+day[0].word);
        res.status(200).send(day);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})


// Putting the API on port 3000
app.listen(process.env.API_PORT || 3000, () => {
    console.log(`API is running on port ${process.env.API_PORT}`);
})

// Export the Express API
module.exports = app;