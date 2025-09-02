const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{type:String,required:true}
});

const getTaskModelForTenant = (tenantId)=>{
    const collectionName=`task_${tenantId}`;
    return mongoose.model(collectionName,taskSchema);
};
module.exports = getTaskModelForTenant