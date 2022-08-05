const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')

// Configures/grabs passwords/links/DB connection from .env
dotenv.config()

const user = {
    name: "Armani Araujo",
    phone: 6476476476,
    age: 98
}

// Connect to DB

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("connected to db!"));

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'pug');

app.get('/index', (req, res) => {
    res.render('index', { title: 'Home' })
})

app.get('/home', (req, res) => {
    res.render('index', { title: 'Home' })
})

app.get('/', (req, res) => {
    res.render('index', user)
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})

//app.use(express.json())

// app.use(express.json({  extended: true }));

// enables parsing using the qs library
app.use(express.urlencoded({  extended: true }));

app.post('/register', async (req, res) => {
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);

/*
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) { res.status(400).semd(err) }
    */

    res.send(req.body);

})

app.post('/userlogin', async (req, res) => {
    console.log("username: ", req.body.username);
    console.log("password: ", req.body.password);
    res.render('home', { 'username': req.body.username });
})
