const User = require("../../db/models/user");

exports.register = async (req, res, next)  => {
    try {
        const user = new User(req.body)
        await user.save()
        res.send({success: true, data: user})
    } catch (error) {
        error.code = 409
        next(error)
    }
}
