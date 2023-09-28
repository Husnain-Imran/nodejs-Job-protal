import Jwt from 'jsonwebtoken'

export const userAuth = async (req,res,next)=>
{
    const authHeader = req.headers.authorization
    // console.log(authHeader)

    if(!authHeader || !authHeader.startsWith("Bearer"))
    {
        next("auth is failed")
    }
    const token = authHeader.split(" ")[1]
    try {
        const payload= Jwt.verify(token,process.env.jwt_secret)
        req.user = {userId:payload.userId}
        next()
    } catch (error) {
        next("auth error")
    }

}
export default userAuth