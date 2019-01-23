var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");
var nameSchema = new mongoose.Schema({
    partNum: String,
    star: String,
    concerns: String,
    firsttechcalls: string,
    firsttechmsg: String,
    firsttechconlist: String,
    secondtechcalls: String,
    secondtechmsg: String,
    secondtechconlist: String,
    notechcalls : String,
    notechmsg: String,
    notechconlist: String,

});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/add-input", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Input saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});