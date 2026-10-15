import mongoose from "mongoose"

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.mongo_url)

        console.log("database connection is successfull")
    }catch(err){
        console.log("database connection failed: ", err.message)
        // process.exit(1)
    }
}

 export default connectDB