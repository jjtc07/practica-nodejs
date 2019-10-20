const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

mongoose.connect('mongodb://localhost/fotos', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const userSchemaJSON = {
    email:String,
    password:String
}

const user_schema = Schema(userSchemaJSON);
const User = mongoose.model('User', user_schema);


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

    User.find((err, users) => {
        if (err) return console.error(err);
        console.log('usuarios: ', users);
        res.render('login');
    })
    
    // res.render('login');
})

app.post('/users', (req, res) => {
    const {email, password} = req.body
    console.log('email: ', email);
    console.log('password: ', password);

    const user = new User({email: email, password, password});

    user.save().then(() => {
        res.send('Guardamos tus datos');
    });
    
    // res.send('Datos recibidos');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});