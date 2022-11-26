require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const rateLimit = require('express-rate-limit');
const port = 3000;

//Rate Limiting
const limiter = rateLimit({
    widnowsMs: 10*60 * 1000, // 10 Mins
    max: 100
});

app.use(limiter);
app.set("trust proxy",1); 

app.use(express.static('public'));
app.use(express.json());

app.use(cors());

//Routes
app.use("/api", require("./router/index"));
app.use("/photo", require("./router/route2"));

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});
