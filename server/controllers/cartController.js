const swag = require('../models/swag');

function add(req, res) {
    const { id } = req.params;
    let { user } = req.session;

    //this will return -1 if it isn't in the cart
    const index = user.cart.findIndex(swag => swag.id == id);
    
    if (index === -1) {
        const selectedSwag = swag.find(swag => swag.id == id);

        user.cart.push(selectedSwag);
        user.total += selectedSwag.price;
    }
    res.status(200).json(user);
};

function deleteProduct(req, res) {
    const { id } = req.params;
    const { user } = req.session;

    const index = user.cart.findIndex(swag => swag.id == id);
    const selectedSwag = swag.find(swag => swag.id == id);

    if (index !== -1) {
        user.cart.splice(index, 1);
        user.total -= selectedSwag.price;
    }
    res.status(200).json(user);
};

function checkout(req, res) {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).json(user)
};

module.exports = {
    add,
    deleteProduct,
    checkout
}