class NewsController {
    // [GET] /news
    index(red, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(red, res) {
        res.send('new detail');
    }
}

module.exports = new NewsController;