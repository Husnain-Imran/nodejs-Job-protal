import mongoose from "mongoose";

const jobScehma = new mongoose.Schema(
    {
        company:
        {
            type:String,
           require:[true,"company name is required"]
        },
        postion:
        {
            type:String,
           require:[true,"job postion  is required"],
           maxlength:100
        } ,
        status:
        {
            type:String,
           enum:["pending","rejected ", "interview "],
           default:"pending"
        } 
        ,
        workType:
        {
            type:String,
           enum:["fulltime","parttime  ", "internship ",'contracr'],
           default:"fulltime"
        } ,
        workLocation:
        {
            type:String,
            default:"lahore"

        },
        createdBy:
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }

    }
    ,
    {
        timestamps:true
    }
)
export default mongoose.model("Job",jobScehma)