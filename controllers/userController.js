const model = require("../models/user");
const Event = require("../models/eventModel");
const RSVPmodel = require('../models/RSVP');

exports.new = (req, res) => {
  res.render("./user/new");
};

exports.create = (req, res, next) => {
  let user = new model(req.body);
  user.save()
    .then((user) => res.redirect("/users/login"))
    .catch((err) => {
      if (err.name === "ValidationError") {
        req.flash("error", err.message);
        res.redirect("/users/new");
      }

      if (err.code === 11000) {
        req.flash("error", "The email is already linked to an account");
        res.redirect("/users/new");
      }

      next(err);
    });
};

exports.getUserLogin = (req, res, next) => {
  res.render("./user/login");
};

exports.login = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  model
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log("You have entered the wrong email address");
        req.flash("error", "You have entered the wrong email address");
        res.redirect("/users/login");
      }
      else {
        user.comparePassword(password).then((result) => {
          if (result) {
            req.session.user = user._id;
            req.flash("success", "You have successfully logged into your account");
            res.redirect("/users/profile");
          }
          else {
            req.flash("error", "You have entered the wrong password");
            res.redirect("/users/login");
          }
        });
      }
    })
    .catch((err) => next(err));
};

exports.profile = (req, res, next) => {
  let id = req.session.user;
  Promise.all([User.findById(id), Event.find({ host: id }), Rsvp.find({ host: id }).populate('event')])
    .then((results) => {
      const [user, events, rsvps] = results;
      console.log(user, events, rsvps);
      res.render("./user/profile", { user, events, rsvps });
    })
    .catch((err) => next(err));
};


exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    else res.redirect("/");
  });
};
