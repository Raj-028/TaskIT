import express from "express"
import Task from "../models/task.js"
import handleErrors from "../utils/handleErrors.js"
import sendSuccess from "../utils/sendSuccess.js"
import isValidObjectID from "../utils/isValidObjectID.js"
import handleTaskNotFound from "../utils/handleTaskNotFound.js"

const router = express.Router()

router.get('/', async(req, res) => {
    try {

        const tasks = await Task.find()
        
        return sendSuccess(res, {
            count: tasks.length,
            tasks
        })

    }catch (err) {
        handleErrors(res, err, "Failed to Fetch the Task")
    }
})

router.post('/', async (req, res) => {
    try{
        const {Title, Description, Priority, DueDate} = req.body

        if(!Title || !Title.trim()){
            return res.status(400).json({
                success: false,
                message: "Task Title is Required"
            })
        }

        const task = await Task.create({
            Title,
            Description,
            Priority,
            DueDate
        })

        return res.status(201).json({
            success: true,
            task
        })
       
    }catch(err){
        handleErrors(res, err, "Failed to Create the Task")
    }
})

router.use('/:id', isValidObjectID)

router.patch('/:id', async (req, res) => {
    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        )

        if(!task){
            return handleTaskNotFound(res)
        }

        return sendSuccess(res, {task})
    
    }
    catch(err){
        handleErrors(res, err, "Failed to Update the Task")
    }
})


router.delete('/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

       if(!task){
            return handleTaskNotFound(res)
        }

        return sendSuccess(res, {task})

    }
    catch(err){
        handleErrors(res, err, "Failed to Delete the Task")
    }
})


router.get('/:id', async (req, res) => {
    try{
        const task = await Task.findById(req.params.id)

       if(!task){
            return handleTaskNotFound(res)
        }

        return sendSuccess(res, {task})

    }catch(err){
        handleErrors(res, err, "Failed to Fetch the Task")
    }
})

export default router