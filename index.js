const express = require('express');
const WordRepository = require('./src/controllers/WordRepository');
const SqliteRepository = require('./src/controllers/SqliteRepository');
const SupaBaseRepository = require('./src/controllers/SupaBaseRepository');
const { authenticateToken, getToken } = require('./src/middlewares/Middleware'); // Middleware authentification
const path = require('path');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// get all the words
app.get('/words', async (req, res) => {
    try {
        let words = await WordRepository.getAllWords()
        res.status(200).send(words);
    } catch (error) {
        res.status(400).send(error);
    }
})

// get a random word
app.get('/word', async (req, res) => {
    try {
        let random = await WordRepository.GetRandomWord()
        res.send(random);
    } catch (error) {
        res.status(400).send(error);
    }
})

// get word of the day
app.get('/day/word', authenticateToken, async (req, res) => {
    try {
        let database = new SqliteRepository('./src/data/save.db')
        day_word = await database.getWordDay()
        database.close()
        res.status(200).send(day_word[0].mot);
    } catch (error) {
        res.status(400).send(error);
    }
})

// update word of the day / used on cron
app.patch('/day/word/update',  async (req, res) => {
    try {
        // let database = new SqliteRepository('./src/data/save.db') //Sqlite Database
        let database = new SupaBaseRepository(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) //Supabase Database
        database.clearTable("day")
        let random = await WordRepository.GetRandomWord()
        database.insertWordDay(random)
        database.close()
        res.status(200).send(random);
    } catch (error) {
        res.status(400).send(error);
    }
})

// get suite of the day
app.get('/day/suite', authenticateToken, async (req, res) => {
    try {
        let database = new SqliteRepository('./src/data/save.db')
        suite_req = await database.getSuiteDay()
        suite_day = []
        suite_req.forEach(el => {
            suite_day.push(el.mot)
        });
        database.close()
        res.status(200).send(suite_day);
    } catch (error) {
        res.status(400).send(error);
    }
})

// update suite of the day / used by vercel cron
app.patch('/day/suite/update', async (req, res) => {
    try {
        let suite_day = await WordRepository.generateList(5)
        let database = new SqliteRepository('./src/data/save.db')
        database.clearTable("suite")
        database.insertSuiteDay(suite_day)
        database.close()
        res.status(200).send(suite_day);
    } catch (error) {
        res.status(400).send(error);
    }
})

// get the word(s) who have the same length
app.get('/word/:length', authenticateToken, async (req, res) => {
    try {
        let length = req.params.length
        console.log(length);
        let words = await Repository.getWordsOfLength(length)
        res.status(200).send(words);
    } catch (error) {
        res.status(400).send(error);
    }
})

// get the token if the features is on
app.get('/token', async (req, res) => {
    try {
        const token = getToken();
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error);
    }
})

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