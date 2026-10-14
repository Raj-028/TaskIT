require("dotenv").config()

const express = require('express')
const connectDB = require("./src/config/db")
const taskRoutes = require('./src/routes/taskRoutes')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("this is finally working")
})

app.use("/api/tasks", taskRoutes)

taskRoutes.get('/check', (req, res) => {
    res.send("this router works")
})


// health check 

app.get('/health', (req, res) => (
    res.status(200).json({
        success: true,
        message: 'the routing is working perfectly',
        timestamp: new Date()
    })
))


const startServer = async () => {
    await connectDB();
    
    app.listen(3000, () =>{
        console.log("hello this is homepage");
        console.log("is it working?")
    })
}

startServer()


