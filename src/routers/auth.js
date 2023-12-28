const express = require('express');
const router = express.Router();
const SupaBaseRepository = require('../controllers/SupaBaseRepository');
require('dotenv').config();

// get the token if the features is on
router.get('/token', async (req, res) => {
    console.log(` \x1B[43m[LOGS API] : Route /auth/token called \x1B[0m`)
    try {
        const token = getToken();
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error);
    }
})

// test database connection
router.get('/supabase', async (req, res) => {
    console.log(` \x1B[43m[LOGS API] : Route /auth/supabase called \x1B[0m`)
    try {
        let supabase = new SupaBaseRepository(process.env.SUPABASE_URL,process.env.SUPABASE_KEY)
        if(supabase){
            res.status(200).send("Database connection is ok!");
        } else {
            res.status(400).send("Database connection is not ok!");
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})


module.exports = router;