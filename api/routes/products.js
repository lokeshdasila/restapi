const express   = require("express");
const router    = express.Router();

router.get('/',(req,res,next)=>{
    console.log("GET to products");
    res.status(200).json({
        message : "yo yo welcome to product land"
    })
});
router.post('/',(req,res,next)=>{
    console.log("POST to products");
    console.log(req.body);
    let addProduct = {
        name : req.body.name,
        price :  req.body.price
    }
    res.status(200).json({
        message : "Added a new product",
        addedProduct : addProduct
    })
});
router.get("/:productId",(req,res,next)=>{
    console.log("Another route another GET");
    let id = req.params.productId;
    if(id==='gogoogle')
    {
        res.status(200).json({
            message : "Yo've hit the special id",
            id : id
        })
    }
    else{
        res.status(200).json({
            message : "Yo've ids",
        })
    }
    
});
router.patch("/:productId",(req,res,next)=>{
    console.log("Patching another product");
    let id = req.params.productId;
    res.status(200).json({
        message : "patched/updated"
    })
    
});
router.delete("/:productId",(req,res,next)=>{
    console.log("Another delete another product");
    let id = req.params.productId;
    res.status(200).json({
        message : "deleted"
    })
    
});

module.exports = router;