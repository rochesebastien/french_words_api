const express = require('express');
const router = express.Router();
const WordRepository = require('../controllers/wordRepository');
const authenticateToken = require('../middlewares/Middleware');
// get all the words
router.get('/', async (req, res) => {
    try {
        let words = await WordRepository.getAllWords()
        res.status(200).send(words);
    } catch (error) {
        res.status(400).send(error);
    }   
})

// get a random word
router.get('/random/', async (req, res) => {
    try {
        let random = await WordRepository.GetRandomWord()
        res.send(random);
    } catch (error) {
        res.status(400).send(error);
    }
})

// get the word(s) who have the same length
router.get('/:length', async (req, res) => {
    try {
        let length = parseInt(req.params.length, 10); // Convertir la chaîne en nombre
        let words = await WordRepository.getWordsOfLength(length);
        res.status(200).send(words);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;