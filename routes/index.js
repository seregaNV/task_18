var express = require('express'),
    json = require('../public/task.json'),
    util = require('util'),
    router = express.Router(),
    now = new Date();

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Task 17',
        message: "Hello everyone!!!",
        date: now
    });
});

router.get('/company', function(req, res, next) {
    var count = req.query.count,
        countJson = json.slice(0, count);
    //    page = req.query.page;
    //console.log(count);
    //console.log(page);
    if((count == parseInt(Math.abs(count))) || !count) {
        res.render('all', {
            title: 'Company list',
            json: countJson,
            date: now
        });
    } else {
        console.error('Incorrect value of "count"');
        res.render('error', {
            title: 'Error',
            error: 'Incorrect value of "count"',
            message: 'You have entered incorrect value of "count", try again.'
        });
    }
});

router.get('/company/:id', function(req, res, next) {
    var companyName,
        country,
        foundingDate,
        phoneNumber,
        discription,
        choiceId = util.format(req.params.id);
    for ( var i in json ) {
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
        res.render('error', {
            title: 'Error',
            error: 'Wrong ID',
            message: 'You have entered the wrong ID, try again.'
        });
    }
});

module.exports = router;