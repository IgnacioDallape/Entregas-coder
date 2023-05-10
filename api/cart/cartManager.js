const fs = require('fs')
const express = require('express')
const { resolve } = require('path')
const app = express()
const PORT = 8080
const productManager = require('../productManager/productManager')



class CartManager{

    constructor(){
        this.cart = []
    }



    addingProductsCart(name, id, quantity){
        

    }


}







module.exports = CartManager