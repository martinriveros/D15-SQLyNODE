const { db_sqlite3_config } = require('./index');
const knex=require('knex');
const dotenv = require('dotenv');
dotenv.config();

let bd_sqlite3 = knex({
  client:'sqlite3',
  connection: db_sqlite3_config.filename
})

class SQLiteDataBase{
  static client;
  constructor(){
    if(SQLiteDataBase.client){
      this.client = SQLiteDataBase.client;
      return SQLiteDataBase.client;
    }
    SQLiteDataBase.client = bd_sqlite3
    this.client = SQLiteDataBase.client;
  }
}

module.exports = new SQLiteDataBase()
