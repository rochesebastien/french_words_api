const express = require('express');
const Repository = require('./src/Repository');
const { authenticateToken, getToken  } = require('./src/middlewares/Middleware'); // Middleware authentification
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


// get a random word
app.get('/word', authenticateToken, async (req, res) => {
    let random = await Repository.GetRandomWord()
    res.send(random);
})

// get word of the day
app.get('/day', authenticateToken, async (req, res) => {
    let day_word = await Repository.getWordOfTheDay()
    res.send(day_word);
})

// get all the words
app.get('/words', authenticateToken, async (req, res) => {
    let words = await Repository.getAllWords()
    res.send(words);
})

// get the word(s) who have the same length
app.get('/word/:length', authenticateToken, async (req, res) => {
    let length = req.params.length
    console.log(length);
    let words = await Repository.getWordsOfLength(length)
    res.send(words);
})

// get the token if the features is on
app.get('/token', async (req, res) => {
    const token = getToken(); 
    res.send(token);
})

// Putting the API on port 3000
app.listen(process.env.API_PORT || 3000, () => {
    console.log(`API is running on port ${process.env.API_PORT}`);
})

// Export the Express API
module.exports = app;