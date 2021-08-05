var express = require('express');
var router = express.Router();
// User model and passpoer for auth

const user = require('../models/user')
const passport = require('passport')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Employee Tracker' });
});

// to register
router.get('/register',function(req,res,next)
{
  res.render('register',{title:'Please Create an Account'})
})

// to login

router.get('/login',function(req,res,next)
{
  //Error message check and display it
  let messages = req.session.messages || []
  req.session.messages=[]

  res.render('login',{title:'Please Enter Login Details',
  messages:messages
})
})

//post mothod for register function
router.post('/register', (req,res,next) =>{
  user.register(new user({
    username: req.body.username
  }),
  req.body.password,(err,newUser) => {
    if(err)
    {
      return res.redirect('/register')
    }
    else{
      req.login(newUser, (err)=> {
        res.redirect('/Projects/index')
      })
    }
  }
  )

})

// Login

router.post('/login', passport.authenticate('local' , {
  successRedirect: '/Projects/index',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}))

router.get('/logout',(req,res,next) =>{
  req.logout()
  res.redirect('login')
})


module.exports = router;
