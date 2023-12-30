const express = require('express');
const router = express.Router();
require('dotenv').config();


const { authenticateToken } = require('../middlewares/Middleware'); // Middleware authentification
const SupaBaseRepository = require('../controllers/SupaBaseRepository');
const WordRepository = require('../controllers/WordRepository');

// get word of the day
router.get('/', authenticateToken, async (req, res) => {
    console.log(` \x1B[43m[LOGS API] : Route /day/word called \x1B[0m`)
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
router.get('/update',  async (req, res) => {
    console.log(` \x1B[43m[LOGS API] : Route /day/word/update called \x1B[0m`)
    try {
        let database = new SupaBaseRepository(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) //Supabase Database
        await database.clearAllWords('day')
        let new_word_day = await WordRepository.GetRandomWordWLength(6)
        let insert = await database.insertWordDay(new_word_day)
        if(insert){
            res.status(200).send(insert);
        } else {
            res.status(200).send("Erreur lors de l'insertion du nouveau jour");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;