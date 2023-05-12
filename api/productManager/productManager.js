const fs = require('fs')
const express = require('express')
const { Router } = express
const routerProducts = new Router()


const bodyParser = require('body-parser');

routerProducts.use(bodyParser.json());

routerProducts.get('/', (req,res) => {
    const newProduct = new productManager
    let resp = newProduct.getProducts()
    resp
    .then( (pr) => {
        res.send(pr)
    })
    .catch( (err) => {
        res.send('error')
    })
})

routerProducts.get('/:id', (req,res) => {
    const newProduct = new productManager
    let resp = newProduct.getProducts()
    resp
    .then( (pr) => {
        res.send(pr)
    })
    .catch( (err) => {
        res.send('error')
    })
})

routerProducts.post('/', async (req,res) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    console.log( Object.values({title}) )
    try{        
        let newProduct = new productManager('./productos.json')
        let a = await newProduct.addProducts(title, description, price, thumbnail, code, stock, status, category)
        if(a == false){
            res.send('error')
        } else {

            res.send('Producto agregado correctamente');
        }
    } catch ( err ) {
        res.send(err)
    }


})

routerProducts.put('/:pid', async (req,res)=>{
    let prodId = req.params.pid
    let prodBody = req.body
    console.log(prodBody)
    console.log(prodId)
    let newProduct = new productManager('./productos.json')
    let prod = await newProduct.getProductsById(prodId)
    res.send(prodBody)
})



class productManager {
    constructor() {
        this.products = []
        this.lastId = 0
    }

    async addProducts(title, description, price, thumbnail, code, stock, status, category) {
        if (title != undefined && description != undefined && price != undefined && thumbnail != undefined && code != undefined && stock != undefined && status != undefined && category != undefined) {
            try {
                this.lastId += 1
                const newProduct = {
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    status: status,
                    category : category,
                    id: this.lastId
                }

                let prod = await this.getProducts()
                prod = Object.values(prod)
                let codingView = prod.map(x=>x.code)
                if (prod.length > 0) {              
                    if ((codingView.find( (e) => e.code !== code)) ) {             
                        let a = this.products.find((x) => x.code === code) ? true : false
                        if (!a) {
                            this.products.push(newProduct)
                            await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(this.products, null, 2), 'utf-8')
                            console.log('producto agregado exitosamente')
                        } else {
                            console.log('producto repetido')
                        }

                    } else {
                        console.log('producto repetido')
                    }
                } else {
                    console.log('array vacio')
                    this.products.push(newProduct)
                    await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(this.products, null, 2), 'utf-8')
                    return this.products

                }
            } catch (err) {
                console.log(err)
                return false


            }
        } else {
            console.log('complete todos los campos')
        }

    }

    async getProducts() {
        try {
            if (fs.existsSync('./api/ProductManager/productos.json')) {
                let read = await fs.promises.readFile('./api/ProductManager/productos.json', 'utf-8')
                if (read != undefined && read != null && read.length > 0) {
                    let readParsed = JSON.parse(read)
                    readParsed = Object.values(readParsed)
                    this.products = Array.isArray(readParsed) ? readParsed : []
                    return this.products
                } else {
                    return this.products = []
                }
            } else {
                console.log('El archivo no existe');
                return this.products = []
            }
        } catch (err) {
            console.log(err, 'error aca')
        }
    }

    async getProductsById(id) {
        try {
            let prod = await this.getProducts()
            let prodValues = Object.values(prod)
            let finding = prodValues.find(product => product.id == id)
            if (finding) {
                console.log('producto  encotrado con id: ' + id)
                return finding
            } else {
                console.log('producto no encotrado')
                return false
            }

        } catch (err) {
            console.log(err)
        }
    }

    async updateProducts(item, modification, id) {
        console.log(item,modification, id)
        try {
            if (item != undefined && modification != undefined && id != undefined) {
                let index = this.products.findIndex((prod) => prod.id == id)
                let newItem = modification
                if (index) {
                    let mod = item
                    if (mod == 'title') {
                        this.products[index].title = newItem;
                    } else if (mod == 'description') {
                        this.products[index].description = newItem;
                    } else if (mod == 'price') {
                        this.products[index].price = newItem;
                    } else if (mod == 'thumbnail') {
                        this.products[index].thumbnail = newItem;
                    } else if (mod == 'code') {
                        this.products[index].code = newItem;
                    } else if (mod == 'status') {
                        this.products[index].status = newItem;
                    }else if (mod == 'stock') {
                        this.products[index].stock = newItem;
                    } else if (mod == 'category') {
                        this.products[index].category = newItem;
                    }
                    else {
                        console.log('error al cambiar parametro');
                    }
                    await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(this.products, null, 2), 'utf-8');
                    console.log(`El producto con id ${id} se actualizó correctamente, se actualizó su ${item}`);
                    return this.products[index];
                } else {
                    console.log('no se encuentra un producto con ese id')
                }
            } else {
                console.log('complete todos los campos')

            }
        } catch (err) {
            console.log('error ', err)
        }


    }
    async deleteProducts(id) {
        if (id != undefined && id != 0 && id != null) {
            let find = this.products.findIndex((prod) => prod.id == id);
            if (find !== -1) {
                let a = this.products.slice(0, find);
                let b = this.products.slice(find + 1, this.products.length);
                this.products.length = 0;
                this.products = a.concat(b);
                console.log(`producto con id ${id}, ha sido eliminado`);
                this.products.sort((a, b) => a.id - b.id)
                await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(this.products, null, 2), 'utf-8')
                return this.products;
            } else {
                console.log('id no encontrado')
            }
        } else {
            console.log('id no valido')
        }
    }
}

const myProduct = new productManager()
async function addingFunction(title, description, price, thumbnail, code, stock, status, category) {
    await myProduct.addProducts(
        title = title,
        description = description,
        price = price,
        thumbnail = thumbnail,
        code = code,
        stock = stock,
        status = status,
        category = category
    )
}

//

module.exports = { routerProducts, productManager };
