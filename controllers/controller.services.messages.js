const services = require('../services/services.messages.js')


const listMessages = async () =>{

try {
  let data  = await services.list_of_messages()
  return data
} catch (error) {
  console.log('error en el listado de productos' + error)
  
}}

const addMessages = async (message) =>{

try {
   return await services.add_new_message(message)
} catch (error) {
  console.log('error agregando mensajes' + error)
  
}}

module.exports = { listMessages, addMessages }