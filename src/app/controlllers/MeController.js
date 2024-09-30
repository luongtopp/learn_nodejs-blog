const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { deleteModel } = require('mongoose');
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}).sortable(req), Course.countDocumentsWithDeleted({ deleted: true })])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses',
                    {
                        deletedCount: deletedCount,
                        courses: mutipleMongooseToObject(courses)
                    })
                // res.json({
                //     deletedCount: deletedCount,
                //     courses: mutipleMongooseToObject(courses)
                // });
            })
            .catch(next);


    }

    // [GET] /me/trash/courses
    trashCourses(red, res, next) {
        Course.findWithDeleted({ deleted: true }).then(courses =>
            res.render('me/trash-courses',
                {
                    courses: mutipleMongooseToObject(courses)
                }))
            .catch(next);

    }

}

module.exports = new MeController;
