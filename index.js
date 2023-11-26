var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true
}));

app.get('/', function (req, res) {
  if (req.session.user) {
      res.redirect('/dashboard');
  } else {
      res.render('login', { error: null });
  }
});

app.post('/login', function (req, res) {
    if (req.body.username === 'admin' && req.body.password === 'admin') {
        req.session.user = req.body.username; 
        res.redirect('/dashboard'); 
    } else {
        res.render('login', { error: 'Invalid username or password.' });
    }
});

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.get('/dashboard', function (req, res) {
    if (req.session.user) { 
        res.render('dashboard', { user: req.session.user });
    } else {
        res.redirect('/'); 
    }
});

app.listen(3000, function () {
    console.log('Listening on port 3000')
});
