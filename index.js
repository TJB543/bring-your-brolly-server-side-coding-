const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 543
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({},(err, data) => {
       response.json(data); 
    });
});

app.post('/api',(request, response) => {
    console.log('I got a request!');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});