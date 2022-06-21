'use strict'

/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var session = require('express-session');

// var connexionMeta = require('./connexionMetamask.js');

var app = module.exports = express();

// config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

app.use(express.static(__dirname + '/public/'));

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});



// dummy database

var users = {
  tj: { name: 'tj' }
};


// Authenticate using our plain-object database of doom!

function authenticate(fn) {
  var user = connexion();
  // query the db for the given username
  if (!user) return fn(null, null)
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  return fn(null, user);
}


function connexion() {
  
  const account=1;
  return account;
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}
// get record adresse publique
//voir js appel fonction solidity
app.get('/', function(req, res){
  res.redirect('/login');
});

function showHtml() {
  const resultat = '  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">  <div class="container">      <a class="navbar-brand" href="#page-top"><img src="CSS/unnamed.png" alt="..." /></a>      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">          Menu          <i class="fas fa-bars ms-1"></i>      </button>      <div class="collapse navbar-collapse" id="navbarResponsive">          <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">              <li class="nav-item"><a class="nav-link" href="user.html">Espace utilisateur</a></li>              <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>          </ul>      </div>  </div></nav>Wahoo! restricted area,   click to <a href="/logout">logout</a>';
  return resultat;
}
app.get('/restricted', restrict, function(req, res){
  // const txt = showHtml();
  const button = 'Wahoo! restricted area, click to <a href="/logout">logout</a>'
  // res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>'+req.session.user);
  // envoyer des données
  // res.send(button+req.session.user);
  // envoyer vers la page restricted
  console.log(req.session.success);
  res.render('restricted');
});

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function (req, res, next) {
  // après avoir appuyé sur login
  authenticate(function(err, user){
    if (err) return next(err)
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        // initialise la session
        req.session.user = req.body.account;
        
        req.session.success = req.session.user;
        console.log(req.session.success);
        res.send('/restricted');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
});


/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}