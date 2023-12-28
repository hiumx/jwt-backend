import bcrypt from 'bcrypt';
import connectDB from '../config/db';
import mysql from 'mysql2/promise';


function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

export async function createNewUser(username, password, email) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt-backend'
      });
    const hashedPassword = hashPassword(password);
    await connection.execute(
        'INSERT INTO `users` (username, password, email) VALUES (?, ?, ?)',
        [username, hashedPassword, email]
    )
}

export async function getAllUsers() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt-backend'
      });
    const [results, fields] =  await connection.execute('SELECT * FROM `users`');
    return results;
}