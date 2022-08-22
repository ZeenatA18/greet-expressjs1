const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const greeting = require('./greet.ff');
const flash = require('express-flash');
const session = require('express-session');

const pgp = require('pg-promise')();

const app = express();
const routes = require('./routes/greet-routes')
// const pg = require("pg");
// const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:pg123@localhost:5432/greetings';



const config = { 
	connectionString : DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = pgp(config);

const greets = greeting(db)
const greetRoutes = routes(greets)
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


app.get('/', greetRoutes.home)

app.post('/greetings', greetRoutes.groet);

app.get('/list', greetRoutes.naams);

app.get('/actions/type', greetRoutes.getNaams);

app.get('/count/:naam', greetRoutes.count);

app.get('/reset', greetRoutes.reset);

const PORT = process.env.PORT || 3017;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})
