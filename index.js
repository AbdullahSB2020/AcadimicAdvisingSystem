const result = require('dotenv').config();

if (!result.error) {
    console.log();
    console.log(result.parsed);
}

// Development Environment
if (process.env.NODE_ENV === 'development') {
    console.log('we are in the development..!')
}

// libraries
const express = require('express');
const mongoose = require("mongoose");
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');

// route imports 
const postsRoute = require('./routes/posts');
const studentsRoute = require('./routes/student');
const advisorsRoute = require('./routes/advisor');
const advisingUnitRoute = require('./routes/advisingUnit');
const registerRoute = require('./routes/api/registeration');
const logoutRoute = require('./routes/api/logout');

// initalizing the app
const app = express();
const PORT = process.env.PORT | 5000;

// connect to DB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// check if connection open successfully
mongoose.connection
    .once('open', () => console.log('\n\tconnected to DB\n'));

// public folder
app.use(express.static(path.join(__dirname, 'public')));

// parsers 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set handlbars engine
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts",
}))

// ----------------------- paths for test ---------------------------

// serve index page
app.get('/', (req, res) => {
    res.render('signIn', {
        pageRole: 'main page',
        enableScriptRigster: false,
    });
})

// api routes
app.use('/registration', registerRoute);

const { verifyToken } = require('./utils/tokenController');

app.use('/post', postsRoute);
app.use('/student', studentsRoute);
app.use('/advisor', advisorsRoute);
app.use('/advisingUnit', advisingUnitRoute);
app.use('/logout', logoutRoute);



app.get('/testToken', verifyToken, (req, res) => {

    const user = res.locals.user;
    console.log(user._id); // if the request is coming from the advisor page then this is advisor otherwise is student.
    console.log('the test token is ok..');
    res.status(200).json({ msg: "we hit testToken path" })

})

// app listenning port

app.listen(PORT, () => console.log(`\n\tapp listens on ${PORT}`));