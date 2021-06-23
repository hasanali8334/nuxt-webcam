var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();
app.use(bodyParser.json());

var Storage = multer.diskStorage({
    
    destination: function(req, file, callback) {
        callback(null, "./Images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    
    storage: Storage
}).array("imgUploader", 3); //Field name and max count

// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/index.html");
// });
app.post("/api/upload", function(req, res) {
    console.log('api post kabul etti');
    upload(req, res, function(err) { 
        console.log('upload çalıştı');
        if (err) {
           // return res.end("Something went wrong!");
            console.log('bişey yanlış gitti');
            console.log(err);
        }
        console.log('upload sağlam');
        // return res.end("File uploaded sucessfully!.");
    });
});

app.listen(5000, function(a) {
    console.log("Listening to port 2000");
});