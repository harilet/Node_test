const express=require('express');
const app=express();
const path=require('path');
const exphbs  = require('express-handlebars');
const request=require("request");
const bodyparser=require('body-parser');
const bodyParser = require('body-parser');

const PORT=process.env.PORT||5000;

app.use(bodyParser.urlencoded({extended:false}));

//API KEY pk_eada4f7f0a224b4b9af6f5ac5867181e
function api_call(finishedapi, tiker){
    request('https://cloud.iexapis.com/stable/stock/'+tiker+'/quote?token=pk_eada4f7f0a224b4b9af6f5ac5867181e', { json:true } ,(err,rep,body) => {
        if(err){
            return console.log(err);
        }
    
        if(rep.statusCode==200){
            //console.log(body);
            finishedapi( body);
        }
    });
}

//Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//set routes
app.get('/', function (req, res) {
    api_call(function(doneapi){
        res.render('home',{
            stock:doneapi
        });
    },'fb');
});
//POST request for company
app.post('/', function (req, res) {
    api_call(function(doneapi){

        res.render('home',{
            stock:doneapi,
        });
    },req.body.stock_ticker);
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.use(express.static(path.join(__dirname,'public')));
app.listen(PORT, ()=>console.log('Server is up') );