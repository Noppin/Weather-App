const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

//init cache
let cache = apicache.middleware

//ENV 
const apiKey = process.env.APIKEY;
const apiBase = process.env.API_BASE_URL;
const apiname = process.env.API_NAME;

router.get("/", cache('2 minutes'), async(req, res)=>{
    try {
        const params = new URLSearchParams({
            [apiname]: apiKey,
            ...url.parse(req.url,true).query
        });
        const apiRes = await needle('get', `${apiBase}?${params}`)
        const data = apiRes.body;

        if(process.env.NODE_ENV !== 'production'){
            console.log(`Request: ${apiBase}?${params}`);
        }

    res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error})
    }
    
});
module.exports = router;