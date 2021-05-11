//Request
//Stats route will call the relevant function in stats manager based on the request

//Response
//Stats route will then res.send the response body received from stats manager back to the client

const express = require('express');
const statsManager = require('../managers/stats_manager');

const router = express.Router();

/*
    get error API 
    
    Method: GET
    Full Path: /stats/errors
    Query Parameters: from and duration
    Response Body: Array
*/

router.get('/errors', (req, res, next) => {
    const { from, duration, status_codes: statusCodes } = req.query;
    return statsManager
        .getErrors(from, duration, statusCodes)
        .then((response) => res.json(response))
        .catch(next);
});

module.exports = router;
