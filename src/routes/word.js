const express = require('express');
const router = express.Router();
const WordRepository = require('../repository/wordRepository');
const authenticateToken = require('../middleware/Middleware');
// get all the words
router.get('/words', async (req, res) => {
    try {
        let words = await WordRepository.getAllWords()
        res.status(200).send(words);
    } catch (error) {
        res.status(400).send(error);
    }   
})

// get a random word
router.get('/word', async (req, res) => {
    try {
        let random = await WordRepository.GetRandomWord()
        res.send(random);
    } catch (error) {
        res.status(400).send(error);
    }
})

// get the word(s) who have the same length
router.get('/word/:length', authenticateToken, async (req, res) => {
    try {
        let length = req.params.length
        console.log(length);
        let words = await WordRepository.getWordsOfLength(length)
        res.status(200).send(words);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;