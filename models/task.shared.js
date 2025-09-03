const mongoose = require('mongoose');

 const taskSharedSchema =  new mongoose.Schema({
    tenantId:{type:String,required:true},
    title:{type:String,required:true}
 });

 module.exports = mongoose.model('TaskShared', taskSharedSchema);

 
//in this model we make use same collection for each tenant