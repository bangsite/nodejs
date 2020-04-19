const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// lowdb
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

// Set some defaults
db.defaults({
        users: []
    })
    .write()


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Run server with port 3000
app.listen(port, () => console.log(`App listerning on port ${port}!`));


app.get('/', (req, res) => {
    res.render('index', {
        name: "aasdjqfjkdjsf"
    });
});

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/search', (req, res) => {

    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q) !== -1;
    });
    
    res.render('users/index', {
        users: matchedUsers,
        // input: q
    });

});

app.get('/users/create', (req, res) => {
    res.render('users/create');
})

app.post('/users/create', (req, res) => {
    db.get('users').push(req.body).write();
    res.redirect('/users');

})