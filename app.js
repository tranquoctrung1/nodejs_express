var express = require('express');
var app = express();
var cookie_parser = require('cookie-parser')
var bodyParser = require('body-parser')

app.use(cookie_parser())

var urlencodedParser = bodyParser.urlencoded({extended : false})

app.set('view engine', 'pug')

//chúng ta có các Restful API
// get là đẩy dữ liệu 
// post đưa dữ liệu lên 
// put là cập nhật dữ liệu 
// delete là xóa dữ liệu

//custom middleware for me
app.use("/", (req,res,next)=>
{
    console.log(`Request Url: ${req.url}`)
    next();
})

app.use('/assets', express.static(`${__dirname}/public`))



app.get('/',(req,res)=>
{
    console.log("Cookie: ", req.cookies)
    // Query String 
   res.render('index',{title: "Quốc Trung",QRString: req.query.search})
})
app.get('/api',(req,res) =>
{
    res.json({
        fistName:"Trần Quốc",
        lastName: "Trung"
    })
})

app.get('/user/:id',(req,res) =>
{
    res.cookie('username: ',req.params.id)
    res.render('user',{id: req.params.id, title: `User ${req.params.id}`})
})

app.get('/login',(req,res) =>
{
    res.render('login',{title: "Login"})
})

app.get('/error',(req,res) =>
{
    res.render('error')
})

app.post('/check',urlencodedParser,(req,res)=>
{
    if(req.body.Username === "tranquoctrung" && req.body.Password === "trung123")
    {
        res.redirect('/')
    }
    else
        res.redirect('/error')
        
})


app.listen(3000,() =>
{
    console.log('Server is running on port: https://localhost:3000')
});