const { ExpressValidator } = require('express-validator');
const { body, validationResult } = new ExpressValidator(
    {
        isAfterStartDate: async () =>
        {
            if (new Date(endDate).getTime() > new Date(startDate).getTime()) 
            {
                return
            }
            else
            {
                throw new Error("End date should be after start date.")
            }
        },
        isAfterToday: async () =>
        {
            if (new Date(startDate).getTime() > Date.now())
            {
                return
            }
            throw new Error("Start date should be after today.")
        }
    }
);

exports.validateId = (req, res, next) =>
{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) 
    {
        let err = new Error('Invalid Event id: ' + id);
        err.status = 400;
        return next(err);
    }
    else
    {
        return next();
    }
}

exports.validateSignup = [body('firstName', 'First name cannot be empty.').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty.').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be between 8 and 64 characters long.').isLength({min: 8, max: 64})];

exports.validateLogin = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be between 8 and 64 characters long.').isLength({min: 8, max: 64})];

exports.validateResult = (req, res, next) => 
{
    let errors = validationResult(req);
    if (!errors.isEmpty())
    {
        errors.array().forEach(error =>
            {
                req.flash('error', error.msg);
            })
        return res.redirect('back');
    }
    return next();
}
let startDate, endDate;

exports.getDateInputs = (req, res, next) =>
{
    startDate = req.body.startTime;
    endDate = req.body.endTime;
    return next();
}

exports.validateEvent = [body('title', 'Title cannot be empty.').notEmpty().trim().escape().isLength({min:2, max:65}),
                        body('details', 'Event details cannot be empty.').isLength({max: 100, min:10}).trim().escape(),
                    body('category', 'Category cannot be empty').notEmpty().trim().escape().isIn(['Homework', 'Work', 'Clubs', 'Outinds', 'Other']),
                    body('location', 'Location cannot be empty.').notEmpty().trim().escape().isLength({min: 3, max: 60}),
                    body('startTime', 'Start time cannot be empty.').isISO8601().trim().escape().toDate().isAfterToday(),
                    body('endTime', 'End time cannot be empty.').isISO8601().trim().escape().toDate().isAfterStartDate()
                ]
exports.startRSVPValidation = (req, res, next) =>
{
    return next();
}
exports.validateRSVP = [body('rsvp', 'RSVP cannot be empty').notEmpty().trim().isIn(["Maybe", "Yes", "No"]).withMessage("The status of the RSVP must be: Yes, No, or maybe")]
