import mongoose from "mongoose";
import  validator  from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"]
        },
        lastName:{
            type:String,
            
        },
        email:
        {
            type:String,
            required:[true,"email is required"],
            unique:true,
            validate:validator.isEmail
        },
        password:
        {
            type:String,
            require:[true,"paswword is required"]
        },
        location:
        {
            type:String,
            default:"pakistan"
        }
    }
    ,
    {timestamps:true}
)
userSchema.pre('save', async function(){

    if(!this.isModified) return
    const salt = await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)

})
userSchema.methods.comparePassword =function(password)
{
    const isMatch= bcrypt.compare(password,this.password)
    return isMatch
}
userSchema.methods.createJWT=function()
{
    return  jwt.sign({userId:this._id},process.env.jwt_secret,{expiresIn:"1d"})

}
export default mongoose.model("User",userSchema)