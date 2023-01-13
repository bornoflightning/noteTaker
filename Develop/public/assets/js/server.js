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
    // req.send("Hello");
    res.sendFile(path.join(__dirname, './../../index.html'))
    console.log("this is your request:" + req);
});

// route for notes page

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './../../notes.html'))
);

// listens to port
app.listen(PORT, () =>
    console.log(`App is listening on port ${PORT}`)
);

