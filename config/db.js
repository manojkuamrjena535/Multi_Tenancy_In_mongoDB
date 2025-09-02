const mongoose = require('mongoose');

const connectMainDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL_MAIN,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Connection to Main MongoDB')
    } catch (error) {
        console.log('mianDB connection error',error);
        process.exit(1);
    }
}
module.exports=connectMainDb;