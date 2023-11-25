const House = require('../models/house');

exports.houses_get_all = (req, res, next) => {
    House.find()
        .then((result) => {
            res.status(200).json({
                wiadomosc: 'List of all listings',
                info: result,
            });
        })
        .catch((err) => res.status(500).json(err));
};

exports.houses_get_by_filters = (req, res, next) => {
    let filter = handleFilters(req);

    House.find(filter)
        .then((result) => {
            res.status(200).json({
                wiadomosc: 'List of filtered listings',
                info: result,
            });
        })
        .catch((err) => res.status(500).json(err));
};

exports.houses_add_new = (req, res, next) => {
    const house = handleNewHouse(req);
    house
        .save()
        .then((result) => {
            res.status(201).json({
                wiadomosc: 'New house added',
                info: result,
            });
        })
        .catch((err) => res.status(500).json(err));
};

exports.houses_get_by_id = (req, res, next) => {
    const id = req.params.houseId;
    House.findById(id)
        .then((result) => {
            res.status(200).json({
                wiadomosc: 'Details about house ' + id,
                info: result,
            });
        })
        .catch((err) => res.status(500).json(err));
};

exports.houses_change = (req, res, next) => {
    const id = req.params.houseId;
    const house = handleNewHouse(req);
    House.findByIdAndUpdate(id, house)
        .then(() => {
            res
                .status(200)
                .json({ wiadomosc: req.body.name + ' changed' });
        })
        .catch((err) => res.status(500).json(err));
};

exports.house_delete = (req, res, next) => {
    const id = req.params.houseId;
    House.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ wiadomosc: 'House ' + id + ' deleted' });
        })
        .catch((err) => res.status(500).json(err));
};

exports.house_delete_by_filters = (req, res, next) => {
    let filter = handleFilters(req);

    House.deleteMany(filter)
        .then((result) => {
            res.status(200).json({ wiadomosc: 'Houses deleted', count: result.deletedCount });
        })
        .catch((err) => res.status(500).json(err));
};


function handleNewHouse(req) {
    return new House({
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        price: req.body.price,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        yearBuilt: req.body.yearBuilt,
        squareFootage: req.body.squareFootage
    });
}

function handleFilters(req) {
    var filter = {};
    for (const key in req.query) {
        if (House.schema.obj.hasOwnProperty(key)) {
            const value = req.query[key];

            const operator = value.substring(0, 3);
            const operand = parseFloat(value.substring(3));

            if (operator === '$gt' || operator === '$lt') {
                filter[key] = { [operator]: operand };
            } else {
                filter[key] = value;
            }
        }
    }
    return filter;
}