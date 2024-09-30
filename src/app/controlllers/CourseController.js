const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    // [GET] /courses/:slug
    async show(req, res, next) {
        await Course.findOne({ slug: req.params.slug }).then(course => {
            res.render('courses/show', { course: mongooseToObject(course) });
        }).catch(next);
    }
    // [GET] /courses/create
    create(req, res, next) {
        // await Course.findOne({ slug: red.params.slug }).then(course => {
        res.render('courses/create');

        // }).catch(next);
    }
    // [POST] /courses/store
    async store(req, res, next) {
        var formData = req.body;
        console.log(formData);
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDv0IA624g225pldQJKSL2hSKTrXA`;
        formData.slug = req.body.videoId;
        const course = new Course(formData);
        await course.save().then(() => res.redirect('/me/stored/courses')).catch();

    }
    // [GET] /courses/store

    edit(req, res, next) {
        Course.findById({ _id: req.params.id }).then(course => {
            res.render('courses/edit', { course: mongooseToObject(course) });
        }).catch(next);
    }
    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);

    } s
    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id }).then(() =>
            res.redirect('back')
        ).catch(next);

    }

    // [PATCH] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id }).then(() =>
            res.redirect('back')
        ).catch(next);

    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id }).then(() =>
            res.redirect('back')
        ).catch(next);

    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } }).then(() =>
                    res.redirect('back')
                ).catch(next);
                break;
            default:
                res.json({ message: 'Action invalid!' })
        }
    }


}

module.exports = new CourseController;
