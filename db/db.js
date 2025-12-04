import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

function createPool() {
  return mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

let pool = createPool();

// Auto-reconnect logic
pool.on("error", (err) => {
  console.error("MySQL Pool Error: ", err);

  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("Reconnecting to MySQL...");
    pool = createPool();
  } else {
    throw err;
  }
});

export default pool.promise();
