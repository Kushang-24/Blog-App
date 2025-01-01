const express = require('express');
const db = require('./config/DataBase');
const multer = require('multer');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const { localAuth } = require('./middleware/BlogsAuth');
const app = express();

app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: 'your_secret_key',
    resave: false,   
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());
localAuth(passport);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const router = require('./routers/Blogsrouter')(upload);
app.use('/', router);

app.use((err, req, res, next) => {
    console.log(err);
});

app.listen(3000, (err) => {
    db();
    if (!err) {
        console.log("Server started");
    }
});
