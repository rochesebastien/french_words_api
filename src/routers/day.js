const express = require('express');
const router = express.Router();
require('dotenv').config();


const { authenticateToken } = require('../middlewares/Middleware'); // Middleware authentification
const SupaBaseRepository = require('../controllers/SupaBaseRepository');
const WordRepository = require('../controllers/WordRepository');

// get word of the day
router.get('/word', authenticateToken, async (req, res) => {
    try {
        let database = new SupaBaseRepository(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) //Supabase Database
        day_word = await database.getWordDay()
        console.log(day_word);
        res.status(200).send(day_word);
    } catch (error) {
        res.status(400).send(error);
    }
})

// update word of the day / used on cron
router.patch('/word/update',  async (req, res) => {
    try {
        let database = new SupaBaseRepository(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) //Supabase Database
        let isDeleted = await database.clearAllWords('day')
        if(!isDeleted){
            res.status(400).send("Error when updating : maybe already empty");
        } else {
            let new_word_day = await WordRepository.GetRandomWordWLength(6)
            let insert = await database.insertWordDay(new_word_day)
        if(insert){
            res.status(200).send(insert);
        } else {
            res.status(200).send("Erreur lors de l'insertion du nouveau jour");
        }
    }

    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;