const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./model/user');
require('dotenv').config();

function main() {
    console.log("Hello world");

    app.use(express.json());
    // Listen at specific port.
    PORT = process.env.PORT;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://172.10.7.106:${PORT}`);
    });

    // The basic route /.
    app.get('/', (req, res) => {
        console.log("Receive!")
        res.send('Connection is successful.');
    });

    // Connect to db.
    const dbURI = process.env.MONGODB_URI;
    console.log(dbURI);
    mongoose.connect(dbURI)
    .then(result => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.log(err));

    // register a user data
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
            next(err);
            res.status(400).send();
        })
    });

    // Get a data.
    app.get('/user/:id', async (req, res) => {
        try {
            const user = await User.findOne({ id: req.params.id });
            if (user) {
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