const express = require('express')
const { Router } = express
const app = express()
const routerProducts = require('./api/ProductManager/products.router')
const routerCart = require('./api/cart/cart.router')
const handlebars = require('express-handlebars')
const homeRouter = require('./routes/home.router')
const realTimeRouter = require('./routes/realtime.router')
const indexRouter = require('./routes/indexrouter')

app.use('/products', routerProducts)
app.use('/cart', routerCart)
app.use('/home', homeRouter)
app.use('/realtime', realTimeRouter)
app.use('/index',indexRouter )



//public

app.use(express.static(__dirname + '/public'))

//handlebars

app.engine('handlebars', handlebars.engine()) 
app.set('view engine','handlebars')
app.set('views', __dirname + '/views')

//socket
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req,res) => {
  res.send('Bienvenidos a la pre-entrega1 !')
})


server.listen(8080, () => {
  console.log('server corriendo')
})

io.on('connection', (socket) => {
  console.log('Nuevo usuario en línea');
});





