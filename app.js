const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
// const cookieSession = require('cookie-session');
const router_app = require('./router_app');
const session_middleware = require('./middlewares/session');
const methodOverride = require('method-override')
const redis = require('redis')
const RedisStore = require('connect-redis')(session);


const User = require('./models/user').User;

const app = express();
const hostname = '127.0.0.1';
const port = 3000;


// se puedne agregar varios archivos
// app.use('/static', express.static('public'))
app.use(express.static('public'))

// middleware bodyParser 
app.use(bodyParser.json()); // para leer parametros json application/json
app.use(bodyParser.urlencoded({extended: true}) ); // 

// para soportar otros metodos http
// app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))
  

// sessiones
// app.use(session({
//     secret: 'jdhgjgj3g3t65378u3bguyt37ut3',
//     resave: false,
//     saveUninitialized: false,
//     // genid: req => {

//     // }
// }))

//utilizando cookies para el manejo de sesiones
// app.use(cookieSession({
//     name: 'session',
//     keys: ['llave-1', 'llave-2'],
// }))

// utilizando Redis para el manejo de sesiones
let client = redis.createClient()
app.use(
  session({
    store: new RedisStore({ client }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
)
//////////////////////////////////////////////////////////////////////////////////

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log('session: ', req.session.user_id);
    
    res.render('index');
})

app.get('/signup', (req, res) => {

    res.render('signup');
})

app.get('/login', (req, res) => {

    // User.find((err, users) => {
    //     if (err) return console.error(err);
    //     console.log('usuarios: ', users);
    //     res.render('login');
    // })

    // User.findById('5dac9b0d4d7133b1dceb97ec', (err, user) => {
    //     console.log('user error: ', err);
    //     console.log('user data: ', user);
    // })
    
    res.render('login');
})

app.post('/users', (req, res) => {
    const {email, password, password_confirmation, username} = req.body
    // console.log('email: ', email);
    // console.log('password: ', password);
    // console.log('password_confirmation: ', password_confirmation);
    // console.log('username: ', username);

    const user = new User({
        email,
        password,
        password_confirmation,
        username,
    });

    user.save().then(() => {
        res.send('Guardamos tus datos');
    }).catch(err => {
        console.log('error: ', err);
        res.send('Error al guardar la información.');
    })
    
    // res.send('Datos recibidos');
})

app.post('/sessions', async (req, res) => {
    const { email, password } = req.body;
    // User.findOne({email, password})
    //     .then(user => {
    //         console.log('sessions then: ', user);
    //         res.send('login de usuario');
    //     })
    //     .catch(err => {
    //         console.log('sessions error: ', err);
    //         res.send('Error al guardar la información.');            
    //     })

    try {
        const user = await User.findOne({email, password});
        req.session.user_id = user._id;
        res.redirect('/app');
        // console.log('el usuario es: ', user)
    } catch (err) {
        console.log('paso un error: ', err);
        res.send('se hayo un error, revisar logs');
    }

    // res.send('usuario logueado');
})

app.use('/app', session_middleware);
app.use('/app', router_app);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});