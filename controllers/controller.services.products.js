const services = require('../services/services.products.js')


const listProducts = async () =>{

try {
  let data  = await services.list_of_products()
  return data
} catch (error) {
  console.log('error en el listado de productos' + error)
  
}}

const addProducts = async (product) =>{

try {
   return await services.add_new_product(product)
} catch (error) {
  console.log('error agregando productos' + error)
  
}}

module.exports = { listProducts, addProducts }

