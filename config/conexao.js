import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()


const pool = mysql.createPool(
    {
        host: "200.129.130.149",
        port : "20002",
        user: "chefvirtual",
        password: "12345678",
        database: "chefvirtual_db"
    }
)


export default pool;