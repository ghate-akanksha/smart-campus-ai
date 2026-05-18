const mongoose = require("mongoose");

const noticeSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      postedBy: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        enum: [
          "admin",
          "faculty",
          "teacher",
        ],
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Notice",
    noticeSchema
  );