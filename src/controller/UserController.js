import * as userService from '../services/userService';

export function create(req, res) {
    res.render('user/create');
}

export function store(req, res) {
    const {username, password, email} = req.body;
    userService.createNewUser(username, password, email);
    res.redirect('/users/manager');
}

export async function manager(req, res) {
    const listUsers = await userService.getAllUsers();
    res.render('user/manager', { listUsers });
}

