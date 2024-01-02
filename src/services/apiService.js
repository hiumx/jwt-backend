import bcrypt from 'bcrypt';
import db from '../db/models';
import { Op } from 'sequelize';

function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

async function checkEmailExist(emailCheck) {
    const email = await db.User.findOne({
        raw: true,
        where: {
            email: emailCheck
        }
    })
    return email ? true : false;
}

async function checkPhoneExist(phoneCheck) {
    const phone = await db.User.findOne({
        raw: true,
        where: {
            phone: phoneCheck
        }
    })

    return phone ? true : false;
}

async function checkUsernameExist(usernameCheck) {
    const username = await db.User.findOne({
        raw: true,
        where: {
            username: usernameCheck
        }
    })

    return username ? true : false;
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
            code: -2,
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

export async function userLogin(data) {

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

    return {
        message: 'Login successfully',
        code: 0,
        data: ''
    }
}