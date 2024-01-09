import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

import db from '../db/models';
import { getRolesByGroupId } from './jwtService';
import { createToken } from '../middleware/jwtAuth';

function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

async function checkEmailExist(emailCheck) {
    const user = await db.User.findOne({
        raw: true,
        where: {
            email: emailCheck
        }
    })
    return user;
}

async function checkPhoneExist(phoneCheck) {
    const user = await db.User.findOne({
        raw: true,
        where: {
            phone: phoneCheck
        }
    })

    return user;
}

async function checkUsernameExist(usernameCheck) {
    const user = await db.User.findOne({
        raw: true,
        where: {
            username: usernameCheck
        }
    })
    return user;
}

export async function registerNewUser(data) {
    const { email, phone, username, password } = data;

    const isEmailExist = await checkEmailExist(email);
    const isPhoneExist = await checkPhoneExist(phone);
    const isUsernameExist = await checkUsernameExist(username);

    if (isEmailExist) {
        return {
            message: 'Email already exists!',
            code: -1,
            data: ''
        }
    }
    if (isPhoneExist) {
        return {
            message: 'Phone already exists!',
            code: -1,
            data: ''
        }
    }
    if (isUsernameExist) {
        return {
            message: 'Username already exists!',
            code: -1,
            data: ''
        }
    }

    const hashedPassword = hashPassword(password);
    try {
        await db.User.create({
            email,
            phone,
            username,
            password: hashedPassword,
        });

        return {
            message: 'Register successfully',
            code: 0,
            data: ''
        }
    } catch (error) {
        return {
            message: 'Something wrong from server...',
            code: -1,
            data: ''
        }

    }

}

export async function  userLogin(data) {

    const userInstance = await db.User.findOne({
        where: {
            [Op.or]: [
                { email: data.keyLogin },
                { phone: data.keyLogin }
            ]
        },
        raw: true
    });


    if (!userInstance) {
        return {
            message: 'Email or phone does not exist',
            code: -1,
            data: ''
        }
    }

    const isMatch = bcrypt.compareSync(data.password, userInstance.password);

    if (!isMatch) {
        return {
            message: 'Password incorrect!',
            code: -1,
            data: ''
        }
    }

    const res = await getRolesByGroupId(userInstance.groupId);

    const userData = res?.data;
    const payload = {
        username: userInstance.username,
        email: userInstance.email,
        userData,
    }

    const accessToken = createToken(payload);

    return {
        message: 'Login successfully',
        code: 0,
        data: {
            accessToken,
            username: userInstance.username,
            userData
        }
    }
}

export async function getUsers({ page, limit }) {
    try {
        let res = {};
        if (page && limit) {
            const offset = (page - 1) * limit;
            res = await db.User.findAndCountAll({
                raw: true,
                include: db.Group_User,
                attributes: { exclude: ['password'] },
                offset: +offset,
                limit: +limit,
            });
        } else {
            res = await db.User.findAll({
                raw: true,
                include: db.Group_User,
                attributes: { exclude: ['password'] }
            });
        }

        return {
            message: 'Get all users successfully',
            code: 0,
            data: res
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        }
    }

}

export async function createUser({ email, phone, username, address, password, gender, groupId }) {
    try {
        const isEmailExist = await checkEmailExist(email);
        const isPhoneExist = await checkPhoneExist(phone);
        const isUsernameExist = await checkUsernameExist(username);

        if (isEmailExist) {
            return {
                message: 'Email already exists!',
                code: -1,
                data: ''
            }
        }
        if (isPhoneExist) {
            return {
                message: 'Phone already sexists!',
                code: -1,
                data: ''
            }
        }
        if (isUsernameExist) {
            return {
                message: 'Username already exists!',
                code: -1,
                data: ''
            }
        }

        const hashedPassword = hashPassword(password);
        const resData = await db.User.create({
            email,
            phone,
            username,
            address,
            password: hashedPassword,
            gender,
            groupId
        })
        return {
            message: 'Created user successfully',
            code: 0,
            data: resData.toJSON()
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        }
    }
}

export async function getUserById(id) {
    try {
        const res = await db.User.findOne({
            where: { id },
            attributes: { exclude: ['password'] }
        })

        return {
            message: 'Get user successfully',
            code: 0,
            data: res
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        }
    }
}

export async function updateUser(id, userData) {
    try {
        const isUsernameExist = await checkUsernameExist(userData.username);
        if (isUsernameExist) {
            return {
                message: 'Username already exists!',
                code: -1,
                data: ''
            }
        }
        await db.User.update(userData, {
            where: { id }
        })
        return {
            message: 'Update user successfully',
            code: 0,
            data: ''
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        }
    }
}


export async function deleteUser(id) {
    try {
        await db.User.destroy({
            where: { id }
        })

        return {
            message: 'Deleted user successfully',
            code: 0,
            data: ''
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        }
    }

}

// Group user

export async function getGroupUsers() {
    try {
        const data = await db.Group_User.findAll({
            raw: true
        });
        return {
            message: 'Get all group user successfully',
            code: 0,
            data: data
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        }
    }
}

