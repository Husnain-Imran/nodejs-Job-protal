import mongoose  from "mongoose";
import Color  from "colors";

const connectDb=async()=>
{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoDb database ${mongoose.connection.host}`)

    }
    catch (err){

        console.log(`mongose data db error ${err}`)
    }
}

export default connectDb