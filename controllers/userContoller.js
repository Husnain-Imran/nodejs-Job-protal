import userModel from "../models/userModel.js"

export const updateUser = async(req,res,next)=>
{

    const {name,email,lastname}=req.body
    if(!name || !email || !lastname)
    {
        next("plz provide the data properly")
    }
    console.log(req.user.userId)
  
    const user =  await userModel.findOne({_id:req.user.userId})
    user.name=name
    user.email=email
    user.lastName=lastname

    await user.save();

    const token = user.createJWT()

    res.status(200).json({
        user,
        token,
      });

}

export default updateUser