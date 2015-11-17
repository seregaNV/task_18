var express = require('express');
var router = express.Router();
var app = express();
var companyData = require('../data/task.json');
var util = require('util');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Task 17'
    });
});

router.get('/company', function(req, res, next) {
    var count = req.query.count,
        countData = companyData.slice(0, count);
    //    page = req.query.page;
    //console.log(count);
    //console.log(page);
    if ((!count || ((count == parseInt(Math.abs(count))) && count <= companyData.length)) && count != 0) {
        res.render('all', {
            title: 'Company list',
            companyData: countData
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
    for (var i in companyData) {
        if (choiceId == companyData[i]._id) {
            companyName = companyData[i].company;
            country = companyData[i].country;
            foundingDate = companyData[i].founding_date;
            phoneNumber = companyData[i].phone;
            discription = companyData[i].discription;
            res.render('one', {
                title: companyName,
                country: country,
                foundingDate: foundingDate,
                phoneNumber: phoneNumber,
                discription: discription
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