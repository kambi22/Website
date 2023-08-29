require('./mysqlcon')
require('./ImageUpload')
let express = require('express')
let cors = require('cors')
let app = express();
let port =5000;
let path = require('path')
let dirPath = path.join(__dirname,'GetImage')
const filelpath = `${dirPath}/secondImage.jpeg`
const createReadStream = require('fs').createReadStream;
const process = require('process');
const fs = require('fs');
const multer = require("multer");
const { google } = require("googleapis");
const upload = multer();
const serviceAccount = require('./creadential.json')
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())




// Create a JWT client using the service account key
const jwtClient = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

// Authorize the JWT client
jwtClient.authorize((err, tokens) => {
  if (err) {
    console.error('Error authorizing JWT client:', err);
    return;
  }

  const drive = google.drive({ version: 'v3', auth: jwtClient });

  const fileMetadata = {
    name: 'image.jpg', // Name of the uploaded file
  };

  const media = {
    mimeType: 'image/jpeg', // MIME type of the image
    body: fs.createReadStream('C:\\Users\\pc\\Desktop\\website\\Node\\uploads\\burger.jpg'), // Path to your local image file
  };

  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: 'id',
    },
    (err, file) => {
      if (err) {
        console.error('Error uploading image:', err);
      } else {
        console.log('Image uploaded, File ID:', file.data.id);
      }
    }
  );
});




app.get('/nodefile', (req, resp) => {
    resp.send('Done')
    console.log('okay hai');

});

const storage = multer.diskStorage({
    destination: "uploads/",

    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")

    }

})
var uploads = multer({ storage });


app.post("/uploads", upload.single('image'), (req, resp) => {

    const image = [ req.file.path]
    console.log('image:', image)
    const sql = 'INSERT INTO images (image,path) VALUES (?)';
    const value = [image];

    connections.query(sql, value, (err, result) => {
        if (err) {
            console.error('error during filel uploading', err)
            resp.status(500).send('not uploading file')
        } else {
            resp.status(200).send('filel uploading successfully')

        }
    })
});
app.post('/cars', upload.single('image'), (req, resp) => {
    const data = req.body
    console.log(data)
    connections.query('INSERT INTO car SET ?', data, (err, result) => {
        if (err) {
            console.log('error', err)
        } else {
            resp.send('done:')
            console.log('uploaded')
        }
    })
});
app.post('/mobiles', upload.single('image'), (req, resp) => {
    const data = req.body
   
    console.log('filelpath',data)
    connections.query('INSERT INTO mobile SET ?', data, (err, result) => {
        if (err) {
            console.log('error', err)
        } else {
            resp.send('done:')
            console.log('uploaded')
        }


    })
});
app.get('/mobiles',(req,resp)=>{
    connections.query('SELECT * FROM mobile',(err,result)=>{
        if(err){
            resp.send('error is comming')
        }else{
            resp.send(result)
            console.log("done")
        }
    })
})
app.get('/cars',(req,resp)=>{
    connections.query('SELECT * FROM car ',(err,result)=>{
        if(err){
            resp.send('error is comming')
        }else{
            resp.send(result)
            console.log("done")
        }
    })
})
app.get("/detail/:id",(req,resp)=>{
    const data = req.params.id
    console.log(req.params.id)
    connections.query('SELECT * FROM mobile WHERE id=?',data,(err,result)=>{
        if(err){
            resp.send('error is comming')
        }else{
            resp.send(result)
        }
    })
})


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
app.get('/getimage', (req, resp) => {
  
    connections.query('SELECT image FROM images',(err, result) => {
        if (err) {
            console.log('error', err)
        } else {
            console.log('Get Data')
            console.log(result)
            resp.send(result)
        }


    })
})
app.get('/get', (req, resp) => {
  
    connections.query('SELECT proimage FROM sell',(err, result) => {
        if (err) {
            console.log('error', err)
        } else {
            const imageData = result[0].image_data;
            resp.send(imageData)
            console.log('Get Data')
            console.log(result)
        }
           
        })
})

app.get("/search/:product",(req,resp)=>{
    const product = req.params.product
    console.log('products',product);
    connections.query('SELECT * FROM mobile WHERE product=?',product,(err,mobile)=>{
    
        if(err){
            resp.send('error is comming')
        }else{
            resp.send(mobile)
        }
    })
})




app.listen(port, () => {
    console.log('server is start ', port);
})