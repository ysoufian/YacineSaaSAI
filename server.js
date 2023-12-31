
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'config.env') });
const errorHandler = require('./middleware/error');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app  = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


//app.use(cors);
//app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));


var rawBodySaver = function (req, res, buf, encoding) {
    if  (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}
app.use(bodyParser.json({ verify: rawBodySaver, extended: true}));


app.use(express.json());


app.use('/api/auth',require('./routes/auth'));
app.use('/api/openai',require('./routes/openai'));
app.use('/api/stripe',require('./routes/stripe'));
app.use(errorHandler)






const port = process.env.PORT |4242 ;
const mongoDbUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoDbUri).then(console.log('Connected to DB')).catch(error => console.log(error));


app.listen( port , ()=>{
    console.log(`server running on port ${port}`);
});