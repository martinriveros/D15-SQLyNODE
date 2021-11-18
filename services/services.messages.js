const db_sqlite3 = require('../config/db_sqlite3.js');
const {db_sqlite3_config} = require('../config/index.js')
const sqlite3 = db_sqlite3.client
const dotenv = require('dotenv');
dotenv.config();


const list_of_messages = async ()=>{

  try {
    let consulta = await sqlite3(db_sqlite3_config.messageTableName)
    .select(
      'message',
      'moment',
      'email')

      return consulta
 }
    catch (error) {
      console.log('estams en el catch de lista de mensajes')
      if(error.code === 'SQLITE_ERROR'){
      await crearTablaMensajes(); 
      }
      if(error.code === 'SQLITE_SCHEMA'){
      await sqlite3.schema.dropTable(db_sqlite3_config.messageTableName);
      await crearTablaMensajes(); 
      }
  };
};

const add_new_message = async (product)=>{
  try {
      console.log(product)
     await sqlite3(db_sqlite3_config.messageTableName)
          .insert(product)
     return product
  }
   catch (error){
    console.log('error al escribir el nuevo producto' + error)  
  }
  }  
  async function crearTablaMensajes (){
    
    try{
      console.log('estamos adentro de crear tabla de mensajes y la tabla es: ' + db_sqlite3_config.messageTableName)
      await sqlite3.schema.createTable(db_sqlite3_config.messageTableName, table=>{
        
        table.increments('id').primary(),
        table.string('message'),
        table.string('moment'),
        table.string('email')
      })
    } catch(error){
      console.log('error al crear tabla ' + error)
    }
  }
module.exports = {list_of_messages, add_new_message}