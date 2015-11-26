var express = require('express'),
    router = express.Router(),
    app = express(),
    companyData = require('../data/task.json'),
    util = require('util'),
    chosenCompany;

router.get('/', function(req, res, next) {
    var valueOfQuery = req.query.query;

    if (valueOfQuery == "") {
        res.render('notFound', {
            title: 'Task 18',
            header: 'Null value in input',
            message: 'To select the company, please enter the value of search...'
        });

    } else if (!valueOfQuery) {
        res.render('index', {
            title: 'Task 18'
        });

    } else if (valueOfQuery) {
        var checkingExistenceOfCompany,
            //checkSubstring,
            partNameCompany,
            companyList = [];
        chosenCompany = {};
        valueOfQuery = valueOfQuery.charAt(0).toUpperCase() + valueOfQuery.substr(1).toLowerCase();


        for (var i in companyData) {
            //checkSubstring = companyData[i].company.indexOf(valueOfQuery);
            partNameCompany = companyData[i].company.slice(0, valueOfQuery.length);

            if ((valueOfQuery == partNameCompany) && (valueOfQuery != companyData[i].company)) {
                companyList.push(companyData[i]);

            } else if (valueOfQuery == companyData[i].company) {
                chosenCompany.company = companyData[i].company;
                chosenCompany.country = companyData[i].country;
                chosenCompany.founding_date = companyData[i].founding_date;
                chosenCompany.phone = companyData[i].phone;
                chosenCompany.discription = companyData[i].discription;
                checkingExistenceOfCompany = 1;
            }
        }
        if (companyList[0]) {
            res.render('all', {
                title: 'Chosen companies',
                partMessage: 'chosen',
                companyData: companyList
            });
        } else if (checkingExistenceOfCompany) {
            res.render('one', {
                title: chosenCompany.company,
                companyData: chosenCompany
            });
        } else {
            res.render('notFound', {
                title: 'Task 18',
                header: 'Null result',
                message: 'Company by your request is not found...'
            });
        }
        //if (checkSubstring == 0) {
        //    //console.log('"' + checkSubstring + '"');
        //} else if (checkSubstring == -1) {
        //    //console.log(checkSubstring);
        //}
    } else {
        console.error('Incorrect value of "query"');
        throw new Error('Incorrect value of "query"');
    }
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
            partMessage: 'all',
            companyData: countData
        });
    } else {
        console.error('Incorrect value of "count"');
        throw new Error('Incorrect value of "count"');
    }
});

router.get('/company/:id', function(req, res, next) {
    var choiceId = util.format(req.params.id);
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

module.exports = router;