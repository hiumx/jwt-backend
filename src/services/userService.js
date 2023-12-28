import bcrypt from 'bcrypt';
import db from '../db/models'
import { DOUBLE } from 'sequelize';


function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

export async function createNewUser(username, password, email) {
    const hashedPassword = hashPassword(password);
    await db.User.create({
        username,
        password: hashedPassword,
        email
    })
}

export async function getAllUsers() {
    return await db.User.findAll();
}

export async function getUserById(id) {
    return await db.User.findAll({
        raw: true,
        where: {
            id
        }
    })
}

export async function updateUser(dataUpdate, id) {
    await db.User.update(dataUpdate, {
        where: {
            id
        }
    })
}

export async function deleteUser(id) {
    await db.User.destroy({
        where: {
            id
        }
    });
}