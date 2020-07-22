const express=require('express')
const expressLayouts=require('express-ejs-layouts')
const app=express()

// Handling MiddleWare Data Requests
app.use(express.urlencoded({extended:false}))

//CONNECTING PAGE
app.use('/styleSheet',express.static('styleSheet'))

//EJS LAYOUTS
app.use(expressLayouts)
app.set('view engine','ejs')

app.get('/',function(req,res){
    res.render('index')
})

app.get('/contact',function(req,res){
    res.render('contact',{qs:req.query})
})

app.get('/profile/:name',function(req,res){
    var data={age:23,job:'programmer',hobbies:['chess','soccer','fishing']}
    res.render('profile', {person:req.params.name,data:data})
})

app.post('/contact',function(req,res){
    console.log(req.body)
    res.render('contact-success',{data:req.body})
})

app.listen(3000,console.log('Server is listening ... '))