const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const apiV2Router = require('./routes/apiV2Routes');
const smsRouter = require('./routes/smsRoutes');
const stapleItemsRouter = require('./routes/stapleItemsRoutes');
const oneTimeItemsRouter = require('./routes/oneTimeItemsRoutes');

const app = express();

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

//HANDLES GET REQUEST FOR FRONT-END
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//API END-POINT ROUTES
app.use('/api/v2/data', apiV2Router);
app.use('/sms', smsRouter);
app.use('/api/v3/staple-items', stapleItemsRouter);
app.use('/api/v3/one-time-items', oneTimeItemsRouter);

module.exports = app;
