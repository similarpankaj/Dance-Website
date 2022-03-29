const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/contactDance');
const port = 80;


//define mongoose schema
const Contact = mongoose.model('Contact', {
     name: String,
     phone: String,
     email: String,
     address: String,
     desc: String,
     });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    console.log(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to db")
    }).catch(()=>{
        res.status(400).send("The item was not saved to the db")
    });
    // res.status(200).render('contact.pug');
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});