const app = require('./app');
require('dotenv').config();

const mongoose = require('mongoose');
const mongoDB = process.env.DB
  .replace('<dbname>', process.env.DB_NAME)
  .replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", () => console.log("connection to db established"));



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
    console.log(`app listening on port: ${port}`)
});