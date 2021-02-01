const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for request
app.listen(3000);

app.get('/', (req, res) => {    
    // res.send('<p>home page</p>');
    const blogs = [
        { title: 'Im all bite no bark', snippet: 'lorem ipsum dolor sit amet consectetur' },
        { title: 'Im caughting in your riptide', snippet: 'lorem ipsum dolor sit amet consectetur' },
        { title: 'I love it when you call me absurd', snippet: 'lorem ipsum dolor sit amet consectetur' }
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {    
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About' })
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});