const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose')
const Contact = require('./models/contact')

const app = express();

// tell our app that ejs is view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));

var contactList = [
    {
        name: "varun chourasia",
        phone: "112342322"
    },
    {
        name: "John DOe",
        phone: "11111111"
    },
    {
        name: "Michel",
        phone: "9292929292"
    }
]

app.get('/', async function(req,res){

    try{
        const newContact = await Contact.find({})
        return res.render('home', {
            title: "My contact",
            contact_List: newContact
        });
    }catch(err){
       console.log('error fetching contacts from db')
       return;
    }
    
})

app.post('/create-contact', async function(req, res) {
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });

        console.log('***********', newContact);
        return res.redirect('back');
    } catch (err) {
        console.log('error in creating contact:', err);
        return res.status(500).send('Error creating contact');
    }
});


//delete contact
app.get('/delete-contact/', async function(req, res) {
    try {
        let id = req.query.id;
        await Contact.findByIdAndDelete(id).exec();

        return res.redirect('back');
    } catch (err) {
        console.log("error in deleting:", err);
        return res.status(500).send('Error deleting contact');
    }
});


app.listen(port, function(err){
    if(err){
        console.log(err)
    }else{
        console.log('My server is up and running');
    }
})