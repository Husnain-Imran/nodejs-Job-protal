import mongoose from "mongoose"
import jobModel from "../models/jobModel.js"

export const createJob =async(req,res,next)=>
{
    const {company,position}=req.body
    if(!company || !position)
    {
        next("enter the valid data ")
    }
    req.body.createdBy=req.user.userId
    const job = await jobModel.create(req.body)
    res.status(200).send({job})
}

export const getAlljobs = async (req,res,nex)=>
{
    const {status,workType,search,sort}=req.query
 // here is the condition for seaarching
    const queryObject=
    {
        createdBy:req.user.userId
    }
    // console.log(queryObject)
    // const job = await jobModel.find({createdBy:req.user.userId})

    // logic for filter 

    // console.log(queryObject.status)
    if(status && status !== 'all')
    {
        queryObject.status=status
    }
    if(workType && workType !== 'all')
    {
        queryObject.workType=workType
    }
    
    if(search)
    {
        queryObject.position= {$regex:search,$options:'i'}
    }


    let queryResult =jobModel.find(queryObject)
    if(sort==="latest")
    {
        queryResult=queryResult.sort('-createdAt')
    }
    if(sort==="oldest")
    {
        queryResult=queryResult.sort('createdAt')
    }
    if(sort==="a-z")
    {
        queryResult=queryResult.sort('position')
    }
    if(sort==="z-a")
    {
        queryResult=queryResult.sort('-position')
    }
    const page =Number(req.query.page) || 1
    const limit= Number(req.query.limit) || 10
    const skip =(page-1)*limit

    queryResult= queryResult.skip(skip).limit(limit)
    
    // console.log(queryResult)
    const totaljobs = await jobModel.countDocuments(queryResult)
    const pageNumber= Math.ceil(totaljobs/limit)


    const jobs =await queryResult
    res.status(200).json(
        {
            totaljobs,
            jobs,
            pageNumber
        }
    )
}

export const updateJob = async(req,res,next)=>
{
    const {id }= req.params
    const {company,position}= req.body

    if(!position || !company )
    {
        next("plz provide all the fields")
    }
    const job = await jobModel.findOne({_id :id })

    if(!job )
    {
        next(`no job found out with this ${id}`)
    }
    // console.log(!req.user.userId)
    if(req.user.userId !==job.createdBy.toString())
    {
 
        next("your not authorizated to update this job")
        return ;
    } 
    const updateJob = await jobModel.findOneAndUpdate({_id:id},req.body,
        {
            new :true,
            runValidators:true
        })
        res.status(200).json(
            {
                updateJob
            }
        )
}
export const deleteJob = async(req,res,next)=>
{

    const {id} = req.params
    const job = await jobModel.findOne({_id:id})
    if(!job)
    {
        next("job not found by this id ")
    }
    if(req.user.userId!==job.createdBy.toString())
    {
        next("this user is not authorizide")
        return ;
    }
    await job.deleteOne()
    res.status(200).json({
        message:"succes fuly deleted"
    })
}


export const jobStatsController = async(req,res,next)=>
{
    const stats = await jobModel.aggregate([
        {
            $match:
            {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            },

           
        },
        {

            $group:
            {
                _id:"$status" ,
                count:{$sum:1}
            }
        }
    ])
    let monthlyStats = await jobModel.aggregate(
        [
            {
                $match:
                {
                    createdBy:new mongoose.Types.ObjectId(req.user.userId)
                }
            },
            {
                $group:
                {
                    _id:
                    {
                        year:
                        {
                             year:{$year:"$createdAt"},
                             month:{$month:"$createdAt"}
                        }
                    },
                    count:
                    {
                        $sum:1,
                    },
                }
            }
        ]
    )
    const defaultStats=
    {
        pending:stats.pending || 0,
        reject:stats.reject || 0,
        interview :stats.interview || 0
    }
    res.status(200).json({
        totaljobs:stats.length,
        stats,
        defaultStats,
        monthlyStats
    })

  
}