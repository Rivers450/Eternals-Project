const Event = require('../models/eventModel');

exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash("error", "You're already logged in.");
        return res.redirect("/users/profile");
    }
}

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash("error", "You're not logged in.");
        return res.redirect("/users/login");
    }
}

//looking to see if the user is the host
exports.isHost = (req, res, next) => {
    let id = req.params.id;
    Event.findById(id)
        .then((event) => {
            if (event) {
                if (event.host == req.session.user) {
                    return next();
                } else {
                    let err = new Error("Error: Unauthorized to access this.");
                    err.status = 401;
                    return next(err);
                }
            } else {
                let err = new Error('Cannot find an Event with id, please try again, sorry.');
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}

//checking to see if the user is a viewer
exports.isViewer = (req, res, next) => {
    let id = req.params.id;
    Event.findById(id)
        .then((event) => {
            if (event) {
                console.log("Checking the viewer status");
                if (event.hostName.toHexString() !== req.session.user) {
                    console.log("The viewer is established.");
                    return next();
                } else {
                    let err = new Error("Only existing users can perform this.");
                    err.status = 403;
                    return next(err);
                }
            }
            else {
                let err = new Error('Cannot find the Event with this id, please try again, sorry.');
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}
