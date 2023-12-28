const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/Middleware');
const WordRepository = require('../controllers/WordRepository');

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

// get a random word with lengh
router.get('/random/:length', async (req, res) => {
    try {
        let length = parseInt(req.params.length);
        if(!length){
            res.status(400).send("Error : you need to specify a length of word");
        }
        let random = await WordRepository.GetRandomWordWLength(length)
        if(!random){
            res.status(400),send("Error can't get a random word of this length");
        }
        res.status(200).send(random);
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