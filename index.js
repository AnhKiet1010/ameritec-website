// require('dotenv').config();

const express = require('express');
const i18n = require("i18n");
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const bodyParser = require("body-parser");

const app = express();

// app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// Config Internationalization
i18n.configure({
    locales: ['cn', 'en', 'vi'],
    directory: __dirname + '/locales',
    cookie: 'lang',
    defaultLanguage: 'en',
    updateFiles: true
});
app.use(i18n.init);

// MongoDB
// mongoose.connect(process.env.MONGO_URL,
//     { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
//         if (err) {
//             console.log("connect fail : " + err);
//         } else {
//             console.log("DB connected!!!");
//         }
//     });

app.use('/change-lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000 });
    res.redirect('back');
});

app.get('/', function (req, res) {
    if (!req.cookies.lang) {
        res.cookie('lang', 'en');
    }
    res.render('./index', { title: 'Home', currentPage: 1, lang: req.cookies.lang });
});

// Config Server Port
app.listen(process.env.PORT || 3000, function () {
    console.log('Server started!!!');
});