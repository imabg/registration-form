const User = require("../../db/models/user");

exports.checkIP = async (req, res, next) => {
  try {
    const { ip } = req.body;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const user = await User.aggregate([
      { $match: { createdAt: { $gte: start, $lt: end }, ipAddress: ip } },
    ])
    if (user.length < 3) res.send({ success: false, IPMatch: false });
    else res.send({ success: true, IPMatch: true });
  } catch (error) {
    error.code = 404;
    next(error);
  }
};
