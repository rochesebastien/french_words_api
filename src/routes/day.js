const express = require('express');
const router = express.Router();
require('dotenv').config();


const { authenticateToken } = require('./src/middlewares/Middleware'); // Middleware authentification
const SupaBaseRepository = require('./repository/SupaBaseRepository');

// get word of the day
router.get('/word', authenticateToken, async (req, res) => {
    try {
        let database = new SupaBaseRepository(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) //Supabase Database
        day_word = await database.getWordDay()
        res.status(200).send(day_word);
    } catch (error) {
        res.status(400).send(error);
    }
})

// update word of the day / used on cron
router.patch('/word/update',  async (req, res) => {
    try {
        // let database = new SupaBaseRepository(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) //Supabase Database
        // database.clearTable("day")
        // let random = await WordRepository.GetRandomWord()
        // database.insertWordDay(random)
        // database.close()
        res.status(200).send("update");
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;