const mongoose = require("mongoose");
const config = require("../config");

module.exports = mongoose.connect(`${config.MONGO_URL}/imagekit`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
