require('./mysqlcon')
let express = require('express')
let cors = require('cors')
let app = express();

app.use(cors())
app.use(express.json())

app.get('/nodefile',(req,resp)=>{
    resp.send('Done')
    console.log('okay hai');
    
});
app.get("/user", (req, resp) => {
    resp.send('users')
});

app.get("/users", (req, resp) => {
    con.query("select * from user ", (err, result) => {
        if (err) {
            resp.send("error")
        }
        else {
            resp.send(result)
            console.log('result')
        }
    })
});
app.get("/upload",  (req, resp) => {
    resp.send("file is uploaded")
    console.log("uploaded")
});
app.get('/uploaded',(req,resp)=>{
    resp.send('done')
    console.log("uploaded");
})
