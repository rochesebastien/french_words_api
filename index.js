const express = require('express');
const WordRepository = require('./src/controllers/WordRepository');
const SqliteRepository = require('./src/controllers/SqliteRepository');
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
        let words = await Repository.getAllWords()
        res.status(200).send(words);
    } catch (error) {
        res.status(400).send(error);
    }
})

// get a random word
app.get('/word', async (req, res) => {
    try {
        let random = await Repository.GetRandomWord()
        res.send(random);
    } catch (error) {
        res.status(400).send(error);
    }
})

// get word of the day
app.get('/day/word', authenticateToken, async (req, res) => {
    try {
        let day_word = await Repository.getWordOfTheDay()
        console.log(day_word);
        res.status(200).send(day_word);
    } catch (error) {
        res.status(400).send(error);
    }
})

// update word of the day / used on cron
app.patch('/day/word/update',  async (req, res) => {
    console.log("saluuutttt");
    try {
        let test = new SqliteRepository()
        test.insertWordDay("salut")
        // let random = await Repository.GetRandomWord()
        console.log(repository);

        // res.status(200).send(suite_day);
    } catch (error) {
        res.status(400).send(error);
    }
})

// update word of the day / used on cron
app.get('/day/suite', authenticateToken, async (req, res) => {
    try {
        res.status(200).send(suite_day);
    } catch (error) {
        res.status(400).send(error);
    }
})

// update word of the day / used by vercel cron
app.patch('/day/suite/update', async (req, res) => {
    try {
        let suite_day = await Repository.setListOfTheDay()
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

// Putting the API on port 3000
app.listen(process.env.API_PORT || 3000, () => {
    console.log(`API is running on port ${process.env.API_PORT}`);
})

// Export the Express API
module.exports = app;