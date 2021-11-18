const { db_mysql_config } = require('./index');
const knex=require('knex');
const dotenv = require('dotenv');
dotenv.config();

let db_mysql = knex({
  client: 'mysql',
  connection:{
    ...db_mysql_config
  },
  pool:{min:0, max:10}
});

class MySQLDataBase{
  static client;
  constructor(){
    if(MySQLDataBase.client){
      this.client = MySQLDataBase.client;
      return MySQLDataBase.client;
    }
    MySQLDataBase.client = db_mysql
    this.client = MySQLDataBase.client;
  }
}


module.exports = new MySQLDataBase()