var express = require("express"),
    bodyParser = require('body-parser'),
    mongu = require('mongoose');

var app = express();
//var port = process.env.port || 3000;
//var ip = process.env.ip || "127.0.0.1";
mongu.connect();
const productsRoutes = require("./api/routes/products");
const orderRoutes   =   require("./api/routes/orders");
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// for allowing CORS (Cross Origin Resource Sharing)
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");  // * for allowing all the origins
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }
    next();
});

app.use("/products",productsRoutes);
app.use("/orders",orderRoutes);
// app.use((req,res,next)=>{
//     console.log("Request Received")
//     res.status(200).json({
//         message: "It works"
//     })
// })

// Webpage not found ERROR
app.use((req,res,next)=>{
    const err = new Error("Webpage not found :(");
    err.status = 404;
    next(err);
});

// Error response
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});

module.exports = app;