const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: true,
            trim: true
        },
        Description: {
            type: String,
            default: ""
        },
        Status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending"
        },
        Priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Low"
        },
        DueDate: {
            type: Date,
            default: null
        }
    },
    { 
        timestamps: true
    }
)

module.exports = mongoose.model("Task", taskSchema)