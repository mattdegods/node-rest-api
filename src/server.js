import express from 'express';
import bodyParser from 'body-parser';
// allows us to use async from filesystem package
import { promises as fs } from 'fs';
import { people } from './people';

// initialize server with express
const app = express();

// plugin that takes extra data from client and puts
// it on the request arg of the POST endpoint
app.use(bodyParser.json());

// define endpoints (URLs we can send requests to and receive responses)

// 1, Hello endpoint (returns a string)
app.get('/hello', (req, res) => {
    res.send('Hello you!');
});

// 2. People endpoint (returns array of people objects)
app.get('/people', (req, res) => {
    res.json(people);
});

// 3. Specific person endpoint (returns specific person object)
app.get('/people/:name', (req, res) => {
    // obj destructuring
    const { name } = req.params;

    const person = people.find((x) => x.name === name);

    res.json(person);
});

// 4. File reader endpoint (read file and a return contents (async))
app.get('/file-data', async (req, res) => {
    const data = await fs.readFile(__dirname + '/people-data.json');
    const people = JSON.parse(data);

    res.json(people);
});

// 5. POST endpoint for people objects
// Takes client data and appends to current array of objects
// Returns new result
app.post('/people', (req, res) => {
    let newPerson = req.body;
    people.push(newPerson);
    res.json(people);
});

// listener functin on port 3000 (common port)
app.listen(3000, () => {
    //console.log('Server successfully listening on Port 3000.');
});