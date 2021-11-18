const dotenv = require('dotenv');
dotenv.config();

let config = {
  port:process.env.PORT || '3000',
  cors:process.env.CORS || '*',
  email_support:process.env.EMAIL_SUPPORT || '',
  email_error:process.env.EMAIL_ERROR || '',
  node_env:process.env.NODE_ENV !=='production',
}

let db_mysql_config = {
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME_MYSQL
}

let db_sqlite3_config = {
    filename:process.env.DB_SQLITE3_DESTINATION,
    messageTableName:process.env.T_NAME_SQLITE3_MESSAGES
}

module.exports = { config, db_mysql_config, db_sqlite3_config }