const express = require('express')
const app = express()
const path = require("path");

const user = {
    name: "Armani Araujo",
    phone: 6476476476,
    age: 98
}

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

app.listen(3000, () => {
    console.log('http://localhost:3000')
})