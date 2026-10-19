const handleTaskNotFound = (res, message = "Task Not Found") => {
    return res.status(404).json({
        success: false,
        message
    })
}

export default handleTaskNotFound