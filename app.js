const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./model/user');
require('dotenv').config();
const http = require('http');
const startSocketServer = require('./socket');

function main() {
    console.log("Hello world");

    app.use(express.json());
    app.use(express.static('public')); // Ensure this line is present

    // Listen at specific port.
    const PORT = process.env.PORT;

    // Start the socket server
    const server = http.createServer(app);
    startSocketServer(server);

    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    // The basic route /.
    app.get('/', (req, res) => {
        console.log("Receive!");
        res.send('Client connection is successful.');
    });

    // Connect to db.
    const dbURI = process.env.MONGODB_URI;
    mongoose.connect(dbURI, {
    })
    .then(result => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.log(err));

    // Register a user data
    app.post('/user', (req, res) => {
        console.log(req.body);
        const user = new User({
            name: req.body.name,
            id: req.body.id,
            password: req.body.password
        });
        user.save()
        .then((result) => {
            console.log(result);
            res.json(result);
            res.status(201).send();
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send();
        });
    });

    // Get a data.
    app.get('/user/:id', async (req, res) => {
        try {
            const user = await User.findOne({ id: req.params.id });
            if (user) {
                console.log('존재하는 id입니다');
                res.status(200).json({name: user.name});
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });
}

main();
