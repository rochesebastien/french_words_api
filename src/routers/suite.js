const express = require('express');
const router = express.Router();
require('dotenv').config();


const { authenticateToken } = require('../middlewares/Middleware'); // Middleware authentification
const SupaBaseRepository = require('../controllers/SupaBaseRepository');
const WordRepository = require('../controllers/WordRepository');

// get suite of the day
router.get('/', authenticateToken, async (req, res) => {
    console.log(` \x1B[43m[LOGS API] : Route /day/suite called \x1B[0m`)
    try {
        let database = new SupaBaseRepository(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) //Supabase Database
        suite_day = await database.getSuiteDay()
        res.status(200).send(suite_day);
    } catch (error) {
        res.status(400).send(error);
    }
})

// update suite of the day / used by vercel cron
router.patch('/update', async (req, res) => {
    try {
        console.log(` \x1B[43m[LOGS API] : Route /day/suite/update called \x1B[0m`)
        let database = new SupaBaseRepository(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) //Supabase Database
        await database.clearAllWords('suite')
        let suite_day = await WordRepository.generateList(5)
        let insert = await database.insertSuiteDay(suite_day)
        if(insert){
            res.status(200).send(suite_day);
        } else {
            res.status(200).send("Erreur lors de l'insertion de la nouvelle suite");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;