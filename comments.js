//Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//import mongoose
var mongoose = require('mongoose');

//connect to our database
mongoose.connect('mongodb://localhost/quotes');

//create Schema
var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String
});

//create model
var Quote = mongoose.model('quotes', QuoteSchema);

//configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//static content
app.use(express.static(path.join(__dirname, './static')));

//setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//root route to render the index.ejs view
app.get('/', function (req, res) {
    res.render('index');
})

//post route for adding a user
app.post('/quotes', function (req, res) {
    console.log("POST DATA", req.body);
    //create a new Quote with the name and quote corresponding to those from req.body
    var quote = new Quote({ name: req.body.name, quote: req.body.quote });
    //try to save that new quote to the database
    quote.save(function (err) {
        //if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong');
        } else { //else console.log that we did well and then redirect to the root route
            console.log('successfully added a quote!');
            res.redirect('/quotes');
        }
    })
})

//route to get all quotes
app.get('/quotes', function (req, res) {
    Quote.find({}, function (err, quotes) {
        if (err) {
            console.log('something went wrong');
        } else {
            console.log('successfully retrieved all quotes');
            res.render('quotes', { quotes: quotes });
        }
    })
})

//listen to port 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})