const express = require('express');
const path = require('path');
const port = 8000;


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

app.get('/', function(req,res){
    return res.render('home', {
        title: "My contact",
        contact_List: contactList
    });
})

app.post('/create-contact', function(req,res){
     contactList.push({
        name: req.body.name,
        phone: req.body.phone
     });
     return res.redirect('/');
})

//delete contact
app.get('/delete-contact/', function(req,res){
    console.log(req.query);
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }

    return res.redirect('back');
})

app.listen(port, function(err){
    if(err){
        console.log(err)
    }else{
        console.log('My server is up and running');
    }
})