const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hostname = '127.0.0.1'; 
const port = 3000;

// se puedne agregar varios archivos
// app.use('/static', express.static('public'))
app.use(express.static('public'))

// middleware bodyParser 
app.use(bodyParser.json()); // para leer parametros json application/json
app.use(bodyParser.urlencoded({extended: true}) ); // 

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/users', (req, res) => {
    const {email, password} = req.body
    console.log('email: ', email);
    console.log('password: ', password);
    
    res.send('Datos recibidos');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});