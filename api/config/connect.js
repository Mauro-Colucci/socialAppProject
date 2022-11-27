import mysql from 'mysql'

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "m4c3d0n1a",
    database: "socialapp"
})