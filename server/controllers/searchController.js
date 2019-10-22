const swag = require("../models/swag");

function search(req, res) {
    const { category } = req.query;
    if (!category) {
        res.status(200).json(swag);
    } else {
        const filteredSwag = swag.filter(swag => swag.category === category);
        res.status(200).json(filteredSwag);
    }
};

module.exports = {
    search
}