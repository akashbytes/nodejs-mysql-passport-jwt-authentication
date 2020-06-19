var express = require('express');
var router = express.Router();
var authModel = require('../models/auth-model');
var bcrypt = require('bcrypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');

/* POST signup . */
router.post('/signup', function(req, res) {
    const password = req.body.password;
    const saltrounds = 10;
    bcrypt.hash(password,saltrounds,function(err,hash){
        req.body.password = hash;
        authModel.signup(req.body, function(err, result) {
            res.json({ data: result, error: err })
        });
    })
});

/* POST  login. */
router.post('/login', function(req, res, next) {
    // console.log(req.body);

    passport.authenticate('local', {session: false}, function(err, user, info) {
        
        if (err) { return next(err); }

        if ( ! user) {
            return res.status(500).json(info.message)
        }

        const payload = {
            username: user.username,
            email: user.email
        }
        const options = {
            subject: `${user.id}`,
            expiresIn: 3600
        }
        const token = jwt.sign(payload, 'secret123', options);
        
        res.json({token});

    })(req, res, next);
})
router.post('/signupFormData', function(req, res) {
            res.json({ data: req.body });
});


module.exports = router;

