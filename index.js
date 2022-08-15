const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const greeting = require('./greet.ff');
const flash = require('express-flash');
const session = require('express-session');

const pgp = require('pg-promise')();

const app = express();

// const pg = require("pg");
// const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:pg123@localhost:5432/greetings';



const config = { 
	connectionString : DATABASE_URL
}

const db = pgp(config);

const greets = greeting(db)

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    secret: "This is my long String that is used for session",
    resave: false,
    saveUninitialized:true
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash());


app.get('/', async function (req, res) {
   let count = await greets.nameCount()

    res.render('index', {
        count

    });
})

app.post('/greetings', async function (req, res) {
    let name = req.body.text_name
    let language = req.body.language


    if (name && language) {
        var msg = greets.greet(name, language)
    }else {
        req.flash('error', greets.validateInputs(name,language))
    }

    if (name && language) {
        await greets.setNames(name);
        var count = await greets.nameCount()
    }

    res.render('index', {
        msg,
        count,
    })
});


app.get('/list',async function (req, res) {
    let names = await greets.getNames()
    console.log(names)
    res.render('actions', {
        names: names
    })

});

app.get('/actions/type', function (req, res) {

    let listedNames = req.body.text

    res.render("getNames", {
        getNames: listedNames
        
    })
});

app.get('/count/:naam', function (req, res) {
    let username = req.params.naam
    let counter = greets.getUsercounter(username);
    let output = `${username} has been greeted ${counter} times.`;

    console.log(output)

    res.render('count', {
        output
    })
});

app.get('/reset',async function (req, res) {
    await greets.reseted();
    console.log("-------------");

    res.redirect('/')
});

const PORT = process.env.PORT || 3017;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})
