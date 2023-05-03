const express = require('express');
const Repository = require('./Repository');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Putting the API on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

// get a random word
app.get('/word', async (req, res) => {
    let random = await Repository.GetRandomWord()
    res.send(random);
})

// get word of the day
app.get('/day', async (req, res) => {
    let day_word = await Repository.getWordOfTheDay()
    res.send(day_word);
})

// get all the words
app.get('/words', async (req, res) => {
    res.send('Hello World');
})

// get the word(s) who have the same length
app.get('/word/:length', async (req, res) => {
    let length = req.params.length
    console.log(length);
    let words = await Repository.getWordsOfLength(length)
    res.send(words); 
})
