const express = require('express');
const router = express.Router();


// get suite of the day
router.get('/day/suite', authenticateToken, async (req, res) => {
    try {
        let database = new SqliteRepository('./src/data/save.db')
        suite_req = await database.getSuiteDay()
        suite_day = []
        suite_req.forEach(el => {
            suite_day.push(el.mot)
        });
        database.close()
        res.status(200).send(suite_day);
    } catch (error) {
        res.status(400).send(error);
    }
})

// update suite of the day / used by vercel cron
router.patch('/day/suite/update', async (req, res) => {
    try {
        let suite_day = await WordRepository.generateList(5)
        let database = new SqliteRepository('./src/data/save.db')
        database.clearTable("suite")
        database.insertSuiteDay(suite_day)
        database.close()
        res.status(200).send(suite_day);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;