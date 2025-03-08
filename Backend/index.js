const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express()

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to Database');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    });
})
.catch((err) => {
    console.log('Unable to connect : ',err);
});