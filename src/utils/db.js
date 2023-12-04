import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import _ from 'lodash';

// Load environment-specific configuration
dotenv.config({ path: process.env.CONFIG_ENV });

let connection

export async function connectDb() {
  if (!connection || connection._closed) {
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'epson_db',
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    };
    console.log('========== Create Pool Connection ==========')
    connection = await mysql.createPool(config);
  } else {
    console.log('========== Old Pool Connection ==========')
  }
  
  return connection;
}
