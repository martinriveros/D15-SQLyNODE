const socket = io();

let plantillaTable
let plantillaMsg
let responseObjectTotal
let responseObject

fetch("/chat/updatedTable")
  .then(response => response.text())
  .then(template => {
    plantillaTable = template
  })
  .catch(e => console.log('some shit happened' + e))
fetch("/chat/updatedMessage")
  .then(response => response.text())
  .then(template => {
    createSocket()
    plantillaMsg = template

  })
  .catch(e => console.log('some shit happened' + e))

function createSocket() {

  socket.on('productNotification', socket => {
    socket.length === 0 ? noProductos = true : noProductos = false
    responseObjectTotal = socket
    if (socket.length !== 0) { renderTable(noProductos) }
  })

  socket.on('messageNotification', socket => {
    socket.length === 0 ? noMensajes = true : noMensajes = false
    responseObject = socket
    if (socket.length !== 0) { renderMsg(noMensajes) }
  })
}

function sendNewProduct(e) {
  e.preventDefault()

  responseObject = {
    name: e.srcElement[0].value,
    price: e.srcElement[1].value,
    thumbnail: e.srcElement[2].value
  }
  socket.emit('productNotification', responseObject)
};

function formularioEnvioMensajes(e) {
  e.preventDefault()
  let now = new Date()
  let responseObject = {
    email: e.srcElement[0].value,
    message: e.srcElement[1].value,
    moment: moment().format('LLL')
    // moment: { 
    //   day:now.getDate(),
    //   month:now.getMonth()+1,
    //   year:now.getFullYear(),
    //   hour:now.getHours(),
    //   minute:now.getMinutes()+1,
    //   second:now.getSeconds()+1
    // }
  }

  console.log(responseObject)
  socket.emit('messageNotification', responseObject)
};
function renderTable(noProductos) {
  injectedProductsTable.innerHTML = ejs.render(plantillaTable, { noProductos, responseObjectTotal })
}

function renderMsg(noMensajes) {
  injectedMessages.innerHTML = ejs.render(plantillaMsg, { noMensajes, responseObject })
}

let formProducts = document.getElementById("formularioEnvioDatos")
let injectedProductsTable = document.querySelector("#tableInjection")
formProducts.addEventListener("submit", sendNewProduct);

let formMsj = document.getElementById("formularioEnvioMensajes")
formMsj.addEventListener("submit", formularioEnvioMensajes);

let injectedMessages = document.querySelector('#injectedMessages')