const express   = require("express");
const router    = express.Router();
const mongu     = require('mongoose');
const productModel = require('../../models/products');

router.get('/',(req,res,next)=>{
    console.log("GET all products");
    productModel.find()
        .select('name price _id')
        .exec()
        .then((docs)=>{
            console.log("Fetched all docs");
            const response = {
                count : docs.length,
                products : docs.map(doc => {
                   return{
                        name : doc.name,
                        price : doc.price,
                        id : doc._id,
                        request : {
                            type : 'GET',
                            url : process.env.API_BASEURL+'products/'+doc._id
                        }
                   } 
                })
            } 
            res.status(200).json(response);
        })
        .catch((err)=>{
            console.log("error in fetching products");
            res.status(500).json({
                message : "error in fetching products"
            });
        });
    
});

router.post('/',(req,res,next)=>{
    console.log("POST to products");
    console.log(req.body);
    let addProductObject = {
        _id : new mongu.Types.ObjectId,
        name : req.body.name,
        price :  req.body.price
    }

    const addProduct = new productModel(addProductObject);

    addProduct.save()
        .then((result)=>{
            console.log("added product " + result);
            res.status(200).json({
                message : "Sucessfully added a new product",
                addedProduct : {
                    name : result.name,
                    price : result.price,
                    id : result._id,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:3000/products'
                    }
                }
            });
        })
        .catch((err)=>{
            console.log("error in adding product "+err);
            res.status(500).json({
                message : "Error in adding the product"
            })
        });
});

router.get("/:productId",(req,res,next)=>{
    console.log("GET a product");
    let id = req.params.productId;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        console.log("Invalid ID");
        return res.status(400).json({
            message : "Invalid ID"
        })
    }
    productModel.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json({
                    "message" : "successful",
                    "result"  : {
                        name : doc.name,
                        price : doc.price,
                        id : doc._id
                    }
                });
            }
            else{
                res.status(200).json({
                    message : "No records found"
                });
            }
            
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({ error : err });
        });
});
router.patch("/:productId",(req,res,next)=>{
    console.log("Patching another product");
    let id = req.params.productId;
    const updateProperties ={};
    for(property of req.body){
        updateProperties[property.name] = property.value;
    }
    productModel.update({_id:id},{$set : updateProperties})
        .exec()
        .then((result)=>{
            console.log(result);
            res.status(200).json({
                message : "patched/updated",
                result
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
    
    
});
router.delete("/:productId",(req,res,next)=>{
    console.log("Another delete another product");
    let id = req.params.productId;
    productModel.remove({_id : id})
        .exec()
        .then((result)=>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({error : err});
        })
    
});

module.exports = router;