const express = require('express')
const app = express()
const bp = require('body-parser')
var cookieParser = require('cookie-parser');
const form = require('./routes/form')


app.use(cookieParser());

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))


app.use(form)


app.listen(80, '0.0.0.0', () => {
    console.log('¡Server UP! http://localhost:8081')
})
