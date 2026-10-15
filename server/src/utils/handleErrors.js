const handleErrors = (res, err, msg) => {
    res.status(500).json({
        success: false,
        message: `${msg}: ${err.message}`
    })
}

export default handleErrors