var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Questionnaire");
var nameSchema = new mongoose.Schema({
    participantNo: String,
    age: Number,
    sex: String,
    occupation: String,
    handOfUse: String,
    //handOfUses: [{right: String, left: string}]
    os:[{andriod:Boolean, iOS: Boolean, blackBerry: Boolean, otherOs: Boolean}],
    //response: [best{easeOfUse: Number, easeOfLearning: Number, etc}],
    response: [best{easeOfUse: Number, easeOfLearning: Number, etc}],


});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Pre-Questionnaireß.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});