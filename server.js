const express = require('express');
const path = require('path');

//port variable
const PORT = process.env.port || 3001;

const app = express();

//middleware for parsing JSON and urlencoded from the data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use('api/', api);

app.use(express.static('public'));

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

// listens to port
app.listen(PORT, () =>
    console.log(`App is listening on port ${PORT}`)
);

