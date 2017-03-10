const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials('./views/partials') // this is used common code snippets sharing
app.set('view engine',hbs)


//Custom Middleware. The execution flow continue only when next is called
app.use((req,res,next)=>{ 
    let now = new Date().toString()
    let log = `${now} : ${req.method} ${req.url}\n`
    // Log the mesage to a file
    fs.appendFile('server.log',log,(err)=>{
        if(err){
            console.log('Unable to log to server.log')
        }
    })
    console.log(log)
    next();
})

// Another Custom Middleware
/*app.use((req,res,next)=>{

    res.render('maintenance.hbs',{
        pageTitle:'Maintenance Page',
        welcomeMessage:'This site is under maintenance! We will be soon'
    })

})
*/

app.use(express.static(__dirname + '/public'))// Middleware
hbs.registerHelper('getCurrentYear',()=>{
     return new Date().getFullYear()
})
//console.log(__dirname)
// HTTP Handler methods ( Routes)
app.get('/',(req,res)=>{
    //res.send('<h1>Hi, This is Express.js</h1>')
/*    res.send({
        name:'Kiran',
        like:[
            'Reading',
            'Biking'

        ]
    })*/

    res.render('home.hbs',{
       pageTitle:'Home Page',
       welcomeMessage: 'Hello! This is a brand new website.'
    })
})

app.get('/about',(req,res)=>{
   // res.send('<h1>About Page</h1>')
   res.render('about.hbs',{
       pageTitle:'About Page',
       currentYear: new Date().getFullYear()
   })
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to handle the request'
    })
})


app.listen(port, () =>{
    console.log(`Server is listening on port : ${port}`)
})