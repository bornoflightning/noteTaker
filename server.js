const express = require('express');
// helps us find path to files on other servers
const path = require('path');

//port variable
const PORT = process.env.port || 3001;

// express as a function
const app = express();

// import file system
const fs = require('fs');

const noteData = require('./db.json');

//middleware for parsing JSON and urlencoded from the data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
// app.use('api/', api);


// ---------------this section has all the get requests 
// root route, get for homepage
app.get('/', (req, res) => {
    // res.send("Hello");
    res.sendFile(path.join(__dirname, '/public/index.html'))
    console.log("your path is: " + __dirname);
});

// route for notes page

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// request data from server as json
// app.get('/api/notes', (req, res) => res.json(noteData));

app.get('/api/notes', (req, res) => {
    console.log('get request received')

    // first we read the file
    fs.readFile('./db.json', 'utf8', (error, data) => {
        if (!error) {
            let currentNotes = JSON.parse(data);
            console.log(currentNotes);
            res.send(currentNotes);
        } else {
            console.log("there was an error: " + error);
        };
    });
});



// ----------------------------------------this section has all the post requests


// post allows us to create data
app.post('/api/notes', (req, res) => {
    // let note = 'here';
    const {title, text} = req.body;
    // checks to ensure that req has input
    if (req.body) {        
        const note = {
            title,
            text
        };     
        // the following code follows these steps:
        //step 1. reads data from json folder and stores it in a variable
        // step 2. appends the new item or note to the json file variable
        // step 3. rewrites the json file with the new data that includes the appended note  
        fs.readFile('./db.json', 'utf8', (error, data) => {
            if(!error) {
                const jsonedNotes = JSON.parse(data);
                console.log("fourth: " + note);
                jsonedNotes.push(note);    
                fs.writeFile('./db.json',JSON.stringify(jsonedNotes, null, 4), (error) => {
                    // handles errors
                    if (error) {
                        console.error(error);
                    }else {
                        console.log('Note added!');
                    }});
            } else {
                console.error(error);
            };
        });       
    };   
});


// listens to port
app.listen(PORT, () =>
    console.log(`App is listening on port ${PORT}`)
);

