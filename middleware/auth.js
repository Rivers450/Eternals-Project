const Event = require('../models/eventModel');

exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash("error", "You have already logged in.");
        return res.redirect("/users/profile");
    }
}
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash("error", "You are currently not logged in.");
        return res.redirect("/users/login");
    }
}
exports.isHost = (req, res, next) => {
    let id = req.params.id;
    Event.findById(id)
        .then((event) => {
            if (event) {
                if (event.host == req.session.user) {
                    return next();
                } else {
                    let err = new Error("You are unauthorized to access the current resources.");
                    err.status = 401;
                    return next(err);
                }
            } else {
                let err = new Error('Cannot find the event with id that is provided.');
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}
