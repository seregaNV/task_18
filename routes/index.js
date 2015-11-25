var express = require('express'),
    router = express.Router(),
    app = express(),
    companyData = require('../data/task.json'),
    util = require('util'),
    chosenCompany;

router.get('/', function(req, res, next) {
    var nameComp = req.query.query;

    if (nameComp == "") {
        res.render('null', {
            title: 'Task 18'
        });

    } else if (!nameComp) {
        res.render('index', {
            title: 'Task 18'
        });

    } else if (nameComp) {
        var partNameCompany,
            companyList = [];
        chosenCompany = {};
        for (var i in companyData) {
            partNameCompany = companyData[i].company.slice(0, nameComp.length);
            if (nameComp == companyData[i].company) {
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
            //else if (nameComp == partNameCompany) {
            //    companyList.push(companyData[i]);
            //    console.log('111' + nameComp.length);
            //    console.log(companyList.length);
            //    res.render('all', {
            //        title: 'Chosen companies',
            //        companyData: companyList
            //    });
            //
            //}
        }

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




//
//router.get('/', function(req, res, next) {
//    var nameComp = req.query.query;
//    //console.log(nameComp);
//    if (nameComp == "") {
//        res.render('null', {
//            title: 'Task 18'
//        });
//    } else if (!nameComp) {
//        res.render('index', {
//            title: 'Task 18'
//        });
//    } else if (nameComp) {
//        var partNameCompany,
//            companyList;
//        chosenCompany = {};
//        for (var i in companyData) {
//            companyList = companyData[i].company.slice(0, nameComp.length);
//            if (nameComp == companyList) {
//                console.log('111' + nameComp.length);
//            } else if (nameComp == companyData[i].company) {
//                chosenCompany.company = companyData[i].company;
//                chosenCompany.country = companyData[i].country;
//                chosenCompany.founding_date = companyData[i].founding_date;
//                chosenCompany.phone = companyData[i].phone;
//                chosenCompany.discription = companyData[i].discription;
//                res.render('one', {
//                    title: chosenCompany.company,
//                    companyData: chosenCompany
//                });
//            }
//        }
//    } else {
//    }
//    //} else {
//    //    console.error('Incorrect value of "count"');
//    //    throw new Error('Incorrect value of "count"');
//    //}
//});
