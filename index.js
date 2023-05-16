const express = require('express')
const { Router } = express
const app = express()
const http = require('http')
const server = http.createServer(app)
const routerProducts = require('./api/ProductManager/products.router')
const routerCart = require('./api/cart/cart.router')
const handlebars = require('express-handlebars')
const homeRouter = require('./routes/home.router')

app.use('/products', routerProducts)
app.use('/cart', routerCart)
app.use('/home', homeRouter)


//public

app.use(express.static(__dirname + '/public'))

//handlebars

app.engine('handlebars', handlebars.engine())
app.set('view engine','handlebars')
app.set('views', __dirname + '/views')

//socket

const { Server } = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('user conectado')
})


app.get('/', (req,res) => {
  res.send('Bienvenidos a la pre-entrega1 !')
})


server.listen(8080, () => {
  
  console.log('server corriendo')
})



