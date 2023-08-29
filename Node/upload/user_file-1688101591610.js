const express = require('express');
const multer = require("multer");


const app = express();




app.get("/multer",  (req, resp) => {
    resp.send("file is uploaded")
    console.log("uploaded")
});
app.listen(100);