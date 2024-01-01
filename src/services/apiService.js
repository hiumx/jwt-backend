import bcrypt from 'bcrypt';
import db from '../db/models';

function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

export async function createNewUser(data) {
    const {email, phone, username, password} = data;
    const hashedPassword = hashPassword(password);
    await db.User.create({
        email,
        phone,
        username,
        password: hashedPassword,
    })
}