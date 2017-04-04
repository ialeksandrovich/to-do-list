const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://iryna-stakhiyevich:333-abc-333-abc@ds129028.mlab.com:29028/local-library';

mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
});

var Todo = mongoose.model('Todo', {
    id: Number,
    title: String,
    description: String,
    list_id: Number
});

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/todos', function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});

app.post('/todos', function(req, res) {
    Todo.create({
        title: req.body.title,
        description : req.body.description,
        list_id : req.body.list_id,
        done : false
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

app.put('/todos/:todo_id', function(req, res) {
    Todo.update({_id : req.params.todo_id}, { "title" : req.body.title, "description" : req.body.description }, function(err, todo) {
        if (err) {
            res.send(err);
        }
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

app.delete('/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

app.get('*', function(req, res) {
    res.sendFile('../public/index.html');
});

app.listen(3333);
