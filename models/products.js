const mongu = require('mongoose');

const productSchema = mongu.Schema({
    _id : mongu.Schema.Types.ObjectId,
    name : {type : String, required : true},
    price : {type : Number, required : true}
});

module.exports = mongu.model('product', productSchema);