const users = require("../models/users");
let id = 1;

function register(req, res) {
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password });
    id++;

    session.user.username = username;

    res.status(200).json(session.user);
};

function login(req, res) {
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        session.user.username = user.username;
        res.status(200).json(session.user);
    } else {
        res.status(500).json('Unauthorized.');
    }
};

function signout(req, res) {
    req.session.destroy();
    res.status(200).json(req.session);
};

function getUser(req, res) {
    const { session } = req;
    res.status(200).json(session.user);
};

module.exports = {
    login,
    register,
    signout,
    getUser
}