const express = require('express');
const multer = require("multer");


const app = express();




app.get("/upload",  (req, resp) => {
    resp.send("file is uploaded")
    console.log("uploaded")
});
app.listen(1000);