import express  from "express";
import userAuth from "../middlewars/authMiddleware.js";
import {createJob ,getAlljobs,updateJob,deleteJob,jobStatsController} from "../controllers/jobController.js"
const router = express.Router()




/**
 * @swagger
 * components:
 *  schemas:
 *    Job:
 *      type: object
 *      required:
 *        - company
 *        - postion
 *        - status
 *        - workType
 *        - workLocation
 *        - createdBy
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *          example : DHSASDHJDJHVAJDSVJAVSD
 *        company:
 *          type: string
 *          description: company name
 *        postion:
 *          type: string
 *          description: position at which user aply
 *        status:
 *          type: string
 *          description: status of the job
 *        workType:
 *          type: string
 *          description: worktype of job at which user apply
 *        workLocation:
 *          type: string
 *          description: location of the job
 *        createdBy:
 *          type: object
 *          description: its the id of user which created the job
 *      example:
 *        id: GDHJGD788BJBJ
 *        copmany: mermaidSoft
 *        postion: DSA xprt
 *        status: pending
 *        worktype: onsite
 *        workLocation: lahore
 *        createdBy: RTWWREETBTGSF
 */
//post route for creating the job


/**
 * @swagger
 * tags:
 *  name: Job
 *  description: authentication apis
 */
/**
 * @swagger
 * //api/v1/job/create-job:
 *    post:
 *      summary: new Job created
 *      tags: [Job]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: job created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal serevr error
 */

router.post('/create-job',userAuth,createJob)


// get all jobs 

router.get('/getJobs',userAuth,getAlljobs)
//udpate the job 

router.patch("/update-job/:id",userAuth,updateJob)
router.delete("/delete-job/:id",userAuth,deleteJob)

// get the stats of job
router.get("/job-stats",userAuth,jobStatsController)
export default router