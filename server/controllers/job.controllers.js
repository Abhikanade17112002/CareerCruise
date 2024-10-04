const jobModel = require("../models/job.model") ;


const handlePostJob = async (request,response) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = request.body;
        const userId = request.userId;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return response.status(200).json({
                message: "all fields are required",
                success: false
            })
        };
        const newJob = await jobModel.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            createdBy: userId
        });
        return response.status(201).json({
            message: "new job created succesfully.",
            newJob,
            success: true
        });
    } catch (error) {
        console.log("something went wrong in creating a new job",error);
    }
} 

const handleGetAllJobPosting = async (request,response) => {
    try {
        const keyword = request.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await jobModel.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return response.status(404).json({
                message: "jobs not found",
                success: false
            })
        };
        return response.status(200).json({
            message:"fetched jobs succesfully" ,
            jobs,
            success: true
        })
    } catch (error) {
        console.log("something went wrong in fetching all job postings",error);
    }
}
// student
const handleGetJobById = async (request, response) => {
    try {
        const jobId = request.params.jobId;
        const job = await jobModel.findById(jobId).populate({
            path:"application",
        
        });
        if (!job) {
            return response.status(200).json({
                message: "no jobs found",
                success: false
            })
        };
        return response.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

const handleGetAllJobsByUser = async (request, response) => {
    try {
        const adminId = request.userId;
        const jobs = await jobModel.find({ createdBy: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return response.status(404).json({
                message: "no jobs found",
                success: false
            })
        };
        return response.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}



module.exports = {handleGetAllJobPosting,handleGetAllJobsByUser, handleGetJobById , handlePostJob} ;