const express = require('express');
const router = express.Router();

// get the token if the features is on
router.get('/token', async (req, res) => {
    try {
        const token = getToken();
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;