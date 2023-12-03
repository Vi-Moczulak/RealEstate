const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_signup = (req, res, next) => {
    const email = req.body.email
    User.findOne({ email }).then((result) => {
        if (result) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new User({
                email: email,
                password: hash,
            });
            user
                .save()
                .then(() => res.status(200).json({ wiadomosc: 'User added' }))
                .catch((err) => res.status(500).json(err));
        });
    });
}

exports.user_login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) return res.status(401).json({ wiadomosc: 'Authorization error' });
        bcrypt.compare(req.body.password, user.password).then((result) => {
            if (!result)
                return res.status(401).json({ wiadomosc: 'Authorization error' });

            const token = jwt.sign({ email: user.email }, process.env.JWT_KEY, {
                expiresIn: '1h',
            });
            return res.status(200).json({ token });
        });
    });
}

exports.user_get_id = (req, res, next) => {
    let filter = {};
    const email = req.params.userEmail;
    filter['email'] = email;

    User.find(filter)
        .then((result) => {
            res.status(200).json({
                wiadomosc: 'User id ',
                id: result[0]._id,
            });
        })
        .catch((err) => res.status(500).json(err));
};

exports.user_delete = (req, res, next) => {
    const id = req.params.userId;
    User.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ wiadomosc: 'User ' + id + ' deleted' });
        })
        .catch((err) => res.status(500).json(err));
}
