let mysql = require('mysql2')
let express = require('express')
let cors = require('cors')
let app = express();

app.use(cors())
app.use(express.json())

connections = mysql.createConnection({
    host:'localhost',
    password:'softmysql@2002',
    database:'olx',
    user:'root'
})
    
connections.connect((err)=>{
    if(err){
        console.log('error');
    }else{
        console.log('connect');
    }
})  


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    