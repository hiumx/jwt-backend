import * as apiService from '../services/apiService';

export function getApiTest(req, res) {
    res.status(200).json({
        message: 'ok',
        data: 'Test data'
    })
}

export async function create(req, res) {
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
        })
    } catch (error) {
        return {
            message: 'Something wrong from server...',
            code: -1,
            data: ''
        }
    }
}

