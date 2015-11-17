var express = require('express'),
    router = express.Router(),
    app = express(),
    companyData = require('../data/task.json'),
    util = require('util');

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
    var choiceId = util.format(req.params.id),
        chosenCompany = {};
    for (var i in companyData) {
        if (choiceId == companyData[i]._id) {
            chosenCompany.company = companyData[i].company;
            chosenCompany.country = companyData[i].country;
            chosenCompany.founding_date = companyData[i].founding_date;
            chosenCompany.phone = companyData[i].phone;
            chosenCompany.discription = companyData[i].discription;
            res.render('one', {
                title: chosenCompany.company,
                companyData: chosenCompany
            });
        }
    }
    if (!chosenCompany.company) {
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