// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes

const express = require('express')
// Start up an instance of app
const app =express()
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());//let server and client talk to each other without Any security issues


// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
//setting variables
const port = 1337;
const server = app.listen(port,listening);

// Callback to debug
function listening(){
    console.log('server is running');
    console.log(`running on localhost: ${port}`);
}

// Initialize all route with a callback function

//array variable that acts as an endpoint
let appdata = []
//Get route
app.get('/send',function(req,res){
    res.send(appdata);
});

//post route
app.post('/add',function(req,res){
entry= {
    temperature: req.body.temperature
    ,
    feel_like: req.body.feel_like,
    usr_inp:req.body.usr_inp
}

    appdata.push(entry)
})