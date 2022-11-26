const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

//init cache
//ENV 
const apikeyPhoto = process.env.API_PHOTO_KEY;
const apiBasePhoto = process.env.API_BASE_PHOTO;
const apiPhotoName = process.env.API_PHOTO_NAME;
router.get("/", async(req, res)=>{
    try {
        const params = new URLSearchParams({
            [apiPhotoName]: apikeyPhoto,
            ...url.parse(req.url,true).query
        });
        const apiRes = await needle('get', `${apiBasePhoto}?${params}`)
        const data = apiRes.body;

        if(process.env.NODE_ENV !== 'production'){
            console.log(`Request: ${apiBasePhoto}?${params}`);
        }

    res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error})
    }
    
});
module.exports = router;