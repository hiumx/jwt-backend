import e from 'express';
import * as apiService from '../services/apiService';

export async function register(req, res) {
    try {
        const { email, phone, username, password } = req.body;

        if (!email || !phone || !username || !password) {
            res.status(422).json({
                SM: 'Missing parameter',
                SC: -1,
                DT: ''
            });
        }

        const resData = await apiService.registerNewUser(req.body);

        res.json({
            responseMessage: resData.message,
            responseCode: resData.code,
            responseData: resData.data
        });
    } catch (error) {
        return {
            responseMessage: 'Something wrong from server...',
            responseCode: -2,
            responseData: ''
        }
    }
}

export async function login(req, res) {

    try {
        const { keyLogin, password } = req.body;

        if (!keyLogin || !password) {
            res.status(422).json({
                SM: 'Missing parameter',
                SC: -1,
                DT: ''
            });
        }

        const resData = await apiService.userLogin(req.body);
        res.json({
            responseMessage: resData.message,
            responseCode: resData.code,
            responseData: resData.data
        });
    } catch (error) {
        return {
            responseMessage: 'Something wrong from server...',
            responseCode: -2,
            responseData: ''
        }
    }

}

export async function getAllUsers(req, res) {
    const { page, limit } = req.query;
    let result = {};
    try {
        const resData = await apiService.getUsers({ page, limit });
        if (page && limit) {
            const pageCount = Math.ceil(resData.data.count / limit);
            const data = {
                users: resData.data.rows,
                pageCount: pageCount
            }
            result = data
        } else {
            result = resData
        }
        res.json({
            responseMessage: resData.message,
            responseCode: resData.code,
            responseData: result
        });

    } catch (error) {
        console.log(error);
        res.json({
            responseMessage: 'Something wrong from server...',
            responseCode: -2,
            responseData: ''
        });
    }
}

export async function createUser(req, res) {
    try {
        const resData = await apiService.createUser(req.body);
        res.json({
            responseMessage: resData.message,
            responseCode: resData.code,
            responseData: resData.data
        });
    } catch (error) {
        console.log(error);
        res.json({
            responseMessage: 'Something wrong from server...',
            responseCode: -2,
            responseData: ''
        });
    }
}


export async function getUserById(req, res) {
    try {
        const resData = await apiService.getUserById(req.params.id);
        res.json({
            responseMessage: resData.message,
            responseCode: resData.code,
            responseData: resData.data
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            responseMessage: 'Something wrong from server...',
            responseCode: -2,
            responseData: ''
        })
    }
}


export async function updateUser(req, res) {
    try {
        const resData = await apiService.updateUser(req.params.id, req.body);
        res.json({
            responseMessage: resData.message,
            responseCode: resData.code,
            responseData: resData.data
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            responseMessage: 'Something wrong from server...',
            responseCode: -2,
            responseData: ''
        })
    }
}

export async function deleteUser(req, res) {
    try {
        const resData = await apiService.deleteUser(req.params.id);
        res.json({
            responseMessage: resData.message,
            responseCode: resData.code,
            responseData: resData.data
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            responseMessage: 'Something wrong from server...',
            responseCode: -2,
            responseData: ''
        })
    }
}

// Group User

export async function getAllGroupUser(req, res) {
    try {
        const resData = await apiService.getGroupUsers();
        res.json({
            responseMessage: resData.message,
            responseCode: resData.code,
            responseData: resData.data
        });
    } catch (error) {
        console.log(error);
        res.json({
            responseMessage: 'Something wrong from server...',
            responseCode: -2,
            responseData: ''
        })
    }
}
