const express = require('express')
const mongoose = require('mongoose');
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
});

mongoose.connect('mongodb+srv://chamilkamihiraj26:chamilka123@compitition.abvci.mongodb.net/Database?retryWrites=true&w=majority&appName=Compitition')
.then(() => {
    console.log('Connected to Database');
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    });
})
.catch((err) => {
    console.log('Unable to connect : ',err);
});