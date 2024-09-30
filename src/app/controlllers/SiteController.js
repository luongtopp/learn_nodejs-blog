const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    async index(red, res) {
        await Course.find({}).then(courses => {
            res.render('home', { courses: mutipleMongooseToObject(courses) });
        }).catch(err => next(err));
    }
    // [GET] /search
    search(red, res) {
        res.render('search');
    }
}

module.exports = new SiteController;