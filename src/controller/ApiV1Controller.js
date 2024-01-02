import * as apiService from '../services/apiService';

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

