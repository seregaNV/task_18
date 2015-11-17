var express = require('express');
var router = express.Router();
var app = express();
var json = require('../public/task.json');
var util = require('util');
var now = new Date();

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Task 17',
        message: 'Hello everyone!!!',
        date: now
    });
});

router.get('/company', function(req, res, next) {
    var count = req.query.count,
        countJson = json.slice(0, count);
    //    page = req.query.page;
    //console.log(count);
    //console.log(page);
    if ((!count || ((count == parseInt(Math.abs(count))) && count <= json.length)) && count != 0) {
        res.render('all', {
            title: 'Company list',
            json: countJson,
            date: now
        });
    } else {
        console.error('Incorrect value of "count"');
        throw new Error('Incorrect value of "count"');
    }
});

router.get('/company/:id', function(req, res, next) {
    var companyName,
        country,
        foundingDate,
        phoneNumber,
        discription,
        choiceId = util.format(req.params.id);
    for (var i in json) {
        if (choiceId == json[i]._id) {
            companyName = json[i].company;
            country = json[i].country;
            foundingDate = json[i].founding_date;
            phoneNumber = json[i].phone;
            discription = json[i].discription;
            res.render('one', {
                title: companyName,
                country: country,
                foundingDate: foundingDate,
                phoneNumber: phoneNumber,
                discription: discription,
                date: now
            });
        }
    }
    if (!companyName) {
        console.error('Wrong ID');
        throw new Error('Wrong ID');
    }
});

router.use(function(req, res) {
    console.error('Page not found');
    throw new Error('Page not found');
});

router.use(function(err, req, res, next) {
    if (app.get('env') == 'development') {
        res.status(500).render('error', {
            title: 'Error page',
            message: err.message,
            stack: err.stack
        });
    } else {
        res.status(404).send('Page not found');
    }
});

module.exports = router;