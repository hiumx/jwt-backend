import * as apiService from '../services/apiService';

export function getApiTest(req, res) {
    res.status(200).json({
        message: 'ok',
        data: 'Test data'
    })
}

export function create(req, res) {
    apiService.createNewUser(req.body)
    res.status(201).json({
        statusMessage: "Create successfully"
    })
}

