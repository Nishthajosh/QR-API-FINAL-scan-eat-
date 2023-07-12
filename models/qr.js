const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
    image: {
        data: Buffer,
        contentType: String,
      },
    text: {
    type: String,
  }
  
});

module.exports = mongoose.model("users", users);
