'use strict'
const express = require("express");
const app = express();
const port = 8080;
const client = "/../client"

//serve client files
app.use(express.static(__dirname + client));


//listen for requests
app.listen(port, () => {
    console.log(`Now listening for requests on port ${port}`);
})