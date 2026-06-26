const mongoose=require("mongoose");

const connectToDb= async () => {
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Database connected");
    })
}

module.exports=connectToDb;