import userModel from "../models/userModel.js"

export const registerControler= async(req,res,next)=>
{
   
        const {name,email,password}= req.body
        if(!name)
        {
           next("name is requierd")
        }
        if(!email)
        {
          
            next("email is requierd")
        }
        if(!password)
        {
           
            next("password is requierd")
        }

        const existUser = await userModel.findOne({email})

        if(existUser)
        {
            next("user already exist")
        }
        const user = await userModel.create({name,email,password})
        const token =user.createJWT()
        res.status(201).send(
            {
                success:true,message:"user created",
                user,
                token

            }
        )
  
}

export const login = async(req,res,next)=>
{
    const {email,password}=req.body

    if(!email || !password)
    {
        next("plz provide the email or pssword")
    }

    const user =  await userModel.findOne({email})

    if(!user)
    {
        // console.log("invalid user ")
        next("invalid user name password ")
 
    }

    const isMatch= await user.comparePassword(password)

    if(!isMatch)
    {
        // console.log("invalid user ")
        next("invalid user name password")
       
    }
    user.password=undefined

    const token =user.createJWT()
    res.status(201).send(
        {
            success:true,message:"login succesfull",
            user,
            token

        }
    )

}