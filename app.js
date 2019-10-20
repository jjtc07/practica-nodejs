const express = require('express');
const app = express();
const hostname = '127.0.0.1'; 
const port = 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});