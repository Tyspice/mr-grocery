const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const smsRouter = require('./routes/smsRoutes');
const apiV2Router = require('./routes/apiV2Routes');
const apiV3Router = require('./routes/apiV3Routes');

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
app.use('/sms', smsRouter);
app.use('/api/v2', apiV2Router);
app.use('/api/v3', apiV3Router);


module.exports = app;
