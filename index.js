const express = require('express');
const Repository = require('./src/Repository');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  
// get a random word
app.get('/word', async (req, res) => {
    let random = await Repository.GetRandomWord()
    res.send(random);
})

// get word of the day
app.get('/day', async (req, res) => {
    let day_word = await Repository.getWordOfTheDay()
    console.log(day_word);
    res.send(day_word);
})

// update word of the day / used by vercel cron
app.get('/day/update', async (req, res) => {
    let day_word = await Repository.generateWordOfTheDay()
    res.send(day_word);
})

// update word of the day / used by vercel cron
app.get('/day/suite', async (req, res) => {
    let suite_day = await Repository.getListOfTheDay()
    res.send(suite_day);
})

// update word of the day / used by vercel cron
app.get('/day/suite/update', async (req, res) => {
    let suite_day = await Repository.generateListOfTheDay()
    res.send(suite_day);
})

// get all the words
app.get('/words', async (req, res) => {
    let words = await Repository.getAllWords()
    res.send(words);
})

// get the word(s) who have the same length
app.get('/word/:length', async (req, res) => {
    let length = req.params.length
    console.log(length);
    let words = await Repository.getWordsOfLength(length)
    res.send(words); 
})

// Putting the API on port 3000
app.listen(3000, () => {
    console.log('API is running on port 3000');
})

// Export the Express API
module.exports = app;