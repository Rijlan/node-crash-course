const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://clinchy:test123@cluster0.mlszw.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');   
    // res.send('<p>home page</p>');
    // const blogs = [
    //     { title: 'Im all bite no bark', snippet: 'lorem ipsum dolor sit amet consectetur' },
    //     { title: 'Im caughting in your riptide', snippet: 'lorem ipsum dolor sit amet consectetur' },
    //     { title: 'I love it when you call me absurd', snippet: 'lorem ipsum dolor sit amet consectetur' }
    // ];
    // res.render('index', { title: 'Home', blogs });    
});

app.get('/about', (req, res) => {    
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About' })
});

// blogs route
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});