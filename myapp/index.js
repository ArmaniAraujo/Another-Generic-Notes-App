const express = require('express')
const app = express()
const user = {
    name: "Armani Araujo",
    phone: 6476476476,
    age: 98
}
app.set('view engine', 'pug');
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/', (req, res) => {
    res.render('home', user)
})
app.get('/home', (req, res) => {
    res.render('home', user)
})
app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})