const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')
const Joi = require('@hapi/joi')

// Configures/grabs passwords/links/DB connection from .env
dotenv.config()

// Connect to DB

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    (err) => {
        if(err) console.log(err)
        else console.log("connected to db!")
    });

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


/*
    Validation schema to validate user 
    information before saving to db
*/
const userSchema = Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6)
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required()
});



app.use(express.json())

// app.use(express.json({  extended: true }));

// enables parsing using the qs library
app.use(express.urlencoded({  extended: true }));

app.post('/register', async (req, res) => {

    
    
    const validation = userSchema.validate(req.body);
    res.send(validation)
    const { error } = userSchema.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

// creating a Mongoose User object
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    console.log("Name:", user.name);
    console.log("Email:", user.email);
    console.log("Password:", user.password);

    try {
        const savedUser = await user.save()
        res.send(console.log("savedUser"))
    } catch (err) {console.log(err.message)}
        //    } catch(err) { res.status(400).send(err) }



})




app.post('/userlogin', async (req, res) => {
    console.log("username: ", req.body.username);
    console.log("password: ", req.body.password);
    res.render('home', { 'username': req.body.username });

    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) console.log("Email exists") 
    else console.log("DNE")
})

