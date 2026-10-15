const sendSuccess = (res, data, msg = null) => {
    res.status(200).json({
        success: true,
        ...(msg && {msg}),
        ...data
    })
}

export default sendSuccess