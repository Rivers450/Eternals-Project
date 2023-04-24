// App for Project 4
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


const app = express();

let port = process.env.PORT || 3000;
let host = 'localhost';
const auth = process.env.AUTH || undefined
let url = 'mongodb+srv://Project4:demos123@cluster0.do2dbu2.mongodb.net/nbad-project4?retryWrites=true&w=majority';
app.set('view engine', 'ejs');

mongoose.connect(url)
    .then(
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        })

    )
    .catch(err => console.log(err.message))

app.use(
    session({
        secret: "jpoj02ghiewqpqig2Alh4",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongoUrl: 'mongodb+srv://Project4:demos123@cluster0.do2dbu2.mongodb.net/nbad-project4?retryWrites=true&w=majority'
        }),
        cookie: { maxAge: 60 * 60 * 1000 }
    })
);
app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'))

app.use('/', mainRoutes);
app.use('/events', eventRoutes)
app.use('/users', userRoutes);


app.use((req, res, next) => {
    let error = new Error("The server cannot locate " + req.url);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error.");
    }
    console.log(err.stack);
    res.status(err.status);
    res.render('./main/error', { error: err });
});