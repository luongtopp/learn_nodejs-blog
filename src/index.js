
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const methodOverride = require('method-override');
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const sortMiddleware = require('./app/middlewares/SortMiddleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));
// HTTP logger
// app.use(morgan('combined'));


app.get('/middleware',
    function (req, res, next) {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            next();
        }
        res.status(403).json({ message: "Access denied" });
    },
    function (req, res, next) {

        res.status(403).json({ message: "Successfully!" });
    }
);

app.use(express.static(path.join(__dirname, 'public')));

// db connect
db.connect();

// Custom middleware
app.use(sortMiddleware);

// Template engine
app.engine('hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (filed, sort) => {
                const sortType = filed === sort.column ? sort.type : 'default';
                const icons = {
                    default: "chevron-expand",
                    asc: "chevron-down",
                    desc: "chevron-up",
                };
                const types = {
                    default: "desc",
                    asc: "desc",
                    desc: "asc",
                };

                const icon = icons[sortType]
                const type = types[sortType]

                return `<a href="?_sort&column=${filed}&type=${type}">
                    <ion-icon name="${icon}"></ion-icon>
                </a>`;
            }

        }
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))








