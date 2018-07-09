const express   = require("express");
const router    = express.Router();

router.get('/',(req,res,next)=>{
    console.log("GET to orders");
    res.status(200).json({
        message : "yo yo welcome to order land"
    })
});
router.post('/',(req,res,next)=>{
    console.log("POST to orders");
    console.log(req.body);
    let newOrder = {
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(200).json({
        message : "Order Placed sucessfully",
        addedOrder : newOrder
    })
});
router.get("/:orderId",(req,res,next)=>{
    console.log("Another route another GET");
    let id = req.params.orderId;
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
router.patch("/:orderId",(req,res,next)=>{
    console.log("Patching another order");
    let id = req.params.orderId;
    res.status(200).json({
        message : "patched/updated order",
        id: id
    })
    
});
router.delete("/:orderId",(req,res,next)=>{
    console.log("Another delete another order");
    let id = req.params.orderId;
    res.status(200).json({
        message : "deleted order",
        id: id
    })
    
});

module.exports = router;