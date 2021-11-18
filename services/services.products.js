const db_mysql = require('../config/db_mysql.js');
const mysql = db_mysql.client
const dotenv = require('dotenv');
dotenv.config();

const list_of_products = async ()=>{
  try {
    let consulta = await mysql(process.env.T_NAME_MYSQL_PRODUCTS)
    .select(
      'id', 
      'name',
      'price',
      'thumbnail')

      return consulta
 }
    catch (error) {
      if(error.code === 'ER_NO_SUCH_TABLE') {
        await crearTablaProductos(); 
      }
  };
};

const add_new_product = async (product)=>{
  try { 
     await mysql(process.env.T_NAME_MYSQL_PRODUCTS)
          .insert(product)
     return product
  }
   catch (error){
    console.log('error al escribir el nuevo producto' + error)  
  }
  }  
  async function crearTablaProductos (product){
    
    try{

      await mysql.schema.createTable(process.env.T_NAME_MYSQL_PRODUCTS, table=>{
        
        table.increments('id').primary(),
        table.string('name')
        table.string('price'),
        table.string('thumbnail')
      })
    } catch(error){
      console.log('error al crear tabla ' + error)
    }
  }
module.exports = {list_of_products, add_new_product}