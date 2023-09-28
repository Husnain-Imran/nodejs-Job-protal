
export const testPostConroler = (req,res)=>
{
    const {name}= req.body

    res.status(200).send(`this is your name ${name}`)
}

