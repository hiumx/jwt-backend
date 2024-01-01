import * as userService from '../services/userService';

export function create(req, res) {
    res.render('users/create');
}

export function store(req, res) {
    const {username, password, email} = req.body;
    userService.createNewUser(username, password, email);
    res.redirect('/users/manager');
}

export async function manager(req, res) {
    const listUsers = await userService.getAllUsers();
    console.log(listUsers)
    res.render('users/manager', { listUsers });
}

export async function edit(req, res) {
    const [user] = await userService.getUserById(req.params.id);
    res.render('users/edit', { user });
}

export async function update(req, res) {
    await userService.updateUser(req.body, req.params.id);
    res.redirect('/users/manager');
}

export async function destroy(req, res) {
    await userService.deleteUser(req.params.id);
    res.redirect('/users/manager');
}
