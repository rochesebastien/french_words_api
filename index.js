const express = require('express');
const Repository = require('./Repository');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome on the french words API (By Roche Sébastien : https://github.com/rochesebastien)");
  });

  
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