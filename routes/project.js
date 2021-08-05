const express = require('express');
const router = express.Router();
const projectModel = require('../models/employee_model'); // adding model reference 

// router.get('/index', (req, res, next) => {
//     res.render('Projects/index', {title: 'test app'});
// })

router.get('/add', (req, res, next) => {
    res.render('Projects/add', {title: 'Project add page'});
})

// -- Deleting the task 
router.get('/delete/:_id', (req, res, next) => {
    projectModel.remove({_id:req.params._id}, err => {
        if(err){
            console.log(err);
        } else {
            // if no error we are redirecting to the index page to show the view 
            res.redirect('/Projects/index')
        }
    })
})


// post of Project/add
router.post('/add', (req, res, next) => {
    // using the project Model to save the data 
    projectModel.create({
        fullName:req.body.fullName,
        email:req.body.email,
        mobile: req.body.mobile,
        city: req.body.city

    },(err,newProject) => {
        if(err) {
            console.log(err);
        }
        else {
            // if no error we are redirecting to the index page 
            res.redirect('/Projects/index')
        }
    })
})

// Fetching the data --
router.get('/index', (req, res, next) => {
    // using our project model to diaplay our data
    projectModel.find((err, Projects) => {
        if(err) {
            console.log(err);
        }else {
            // loading the index view 
            res.render('Projects/index', {
                title: 'Displaying Data',
                project: Projects
            })
        }
    })
})

// -- Editing the Task 
router.get('/edit/:_id', (req, res, next) => {
    projectModel.findById(req.params._id, (err, taskData) => {
        if(err){
            console.log(err);
        }
        else {
            res.render('Projects/edit', { title: 'Project Details', project: taskData})
        }
    })
})

router.post('/edit/:_id', (req, res, next) => {
    projectModel.findOneAndUpdate({_id: req.params._id},{
        fullName:req.body.fullName,
        email:req.body.email,
        mobile: req.body.mobile,
        city: req.body.city
    }, (err, project) => {
        if(err){
            console.log(err);
        }
        else {
            res.redirect('/Projects/index')
        }
    })
})


module.exports = router;