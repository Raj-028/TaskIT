import mongoose from "mongoose";

const isValidObjectID = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            success: false,
            message: "invalid Task ID"
        })
    }

    next()
}

export default isValidObjectID