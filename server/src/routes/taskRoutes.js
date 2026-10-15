const express = require("express")
const Task = require("../models/task")

const router = express()

router.get('/', async(req, res) => {
    try {
        const tasks = await Task.find()
        
        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        })
    }catch (err) {
        res.status(500).json({
            success:false,
            message: `failed to fetch task: ${err.message}`
        })
    }
})

router.post('/', async (req, res) => {
    try{
        const {Title, Description, Priority, DueDate} = req.body

        if(!Title || !Title.trim()){
            return res.status(400).json({
                success: true,
                message: "Task Title is Required"
            })
        }

        const task = await Task.create({
            Title,
            Description,
            Priority,
            DueDate
        })

        res.status(201).json({
            success: true,
            task
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: `failed to create task: ${err.message}`
        })
    }
})

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

        if(!task) {
            return res.status(404).json({
                success: false,
                message: "task not found"
            })
        }
        res.status(200).json({
            success: true,
            task
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: `Failed to update the Task: ${err.message}`
        })
    }
})

module.exports = router