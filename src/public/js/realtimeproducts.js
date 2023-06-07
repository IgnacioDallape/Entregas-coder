const socket = io();
const list = document.getElementById('list');



socket.on('data', (data) => {
    render(data)
});


const render = (data) => {
    console.log(data)
    const a = data.map( e => {
        return(
            `
                name: ${e.name} and price: ${e.price}
            `
        )
    })
    const listItem = document.createElement('li');
    listItem.textContent = a;
    list.appendChild(listItem);
}


const mostarandoProductos = async () => {
    let a = new ProductManager()
    let b = await a.getProducts()
    console.log(b)
}


